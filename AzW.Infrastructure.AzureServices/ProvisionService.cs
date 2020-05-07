using AzW.Model;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Rest;
using System.Collections.Generic;
using AzW.Secret;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Azure.Management.Network.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Compute.Fluent.VirtualMachine.Definition;
using System;
using Microsoft.Azure.Management.Network.Fluent.Models;
using Microsoft.Azure.Management.AppService.Fluent;
using System.Reflection;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.ResourceActions;
using Microsoft.Azure.Management.Network.Fluent.NetworkSecurityRule.Definition;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.GroupableResource.Definition;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.ChildResource.Definition;
using Microsoft.Azure.Management.Storage.Fluent;
using Microsoft.Azure.Management.OperationalInsights;
using Microsoft.Azure.Management.OperationalInsights.Models;

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(string subscriptionId, WorkbenchSecret secret) : base(secret)
        {
            _subscriptionId = subscriptionId;
        }

        public async Task<ProvisionResult> ProvisionAsync(dynamic[] provisionContexts)
        {
            var provisionResult = new ProvisionResult();

            try
            {
                IEnumerable<dynamic> nonNsgContexts;

                var nsgContexts = SortoutNSGNonNSGContexts(provisionContexts, out nonNsgContexts);

                //*important: NSG to create first
                foreach(dynamic context in nsgContexts)
                {
                    JObject jObj = JObject.Parse(context.ToString());
                    NSG nsg = jObj.ToObject<NSG>();
                    await CreateNSGAsync(nsg);
                }

                if(nonNsgContexts != null)
                {
                    foreach(dynamic context in nonNsgContexts)
                    {
                        JObject jObj = JObject.Parse(context.ToString());
                        string resourceType = jObj["ResourceType"].ToString();

                        switch(resourceType)
                        {
                            case ResourceType.VNet:
                                VNet vnet = jObj.ToObject<VNet>();
                                await CreateVNetAsync(vnet, _vnets);
                            break;
                            case ResourceType.NLB:
                                NLB nlb = jObj.ToObject<NLB>();
                                await CreateNLBAsync(nlb);
                            break;
                            case ResourceType.VM:
                                VM vm = jObj.ToObject<VM>();
                                await CreateVMAsync(vm);
                            break;
                            case ResourceType.AppService:
                                WebApp webapp = jObj.ToObject<WebApp>();
                                await CreateAppService(webapp);
                            break;
                            case ResourceType.BlobStorage:
                                Model.StorageAccount blob = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(blob);
                            break;
                            case ResourceType.QueueStorage:
                                Model.StorageAccount queue = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(queue);
                            break;
                            case ResourceType.TableStorage:
                                Model.StorageAccount table = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(table);
                            break;
                            case ResourceType.AzFile:
                                Model.StorageAccount file = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(file);
                            break;
                            case ResourceType.LogAnalytics:
                                LogAnalytics law = jObj.ToObject<LogAnalytics>();
                                await CreateLAWAsync(law);
                            break;
                            
                        }
                    }
                }              

                provisionResult.IsSuccessful = true;
            }
            catch(Exception ex)
            {
                provisionResult.IsSuccessful = false;
                provisionResult.ErrorMessage += ex.Message;
            }

            return provisionResult;
        }

        private IEnumerable<dynamic> SortoutNSGNonNSGContexts
            (dynamic[] provisionContexts, out IEnumerable<dynamic> otherContexts)
        {
            var nsgCons = new List<dynamic>();
            var nonNsgCons = new List<dynamic>();

            foreach(dynamic context in provisionContexts)
            {
                JObject jObj = JObject.Parse(context.ToString());
                string resourceType = jObj["ResourceType"].ToString();

                if(resourceType == ResourceType.NSG)
                    nsgCons.Add(context);
                else
                    nonNsgCons.Add(context);
            }

            otherContexts = nonNsgCons;

            return nsgCons;
        }

        private async Task CreateVNetAsync(VNet vnet, Dictionary<string, INetwork> provisionedVNets)
        {                 
           var withCreateSubnet = AzClient.WithSubscription(_subscriptionId)
                .Networks.Define(vnet.Name)
                .WithRegion(vnet.Location)
                .WithExistingResourceGroup(vnet.ResourceGroupName)
                .WithAddressSpace(vnet.AddressSpace);
            
            foreach(var subnet in vnet.Subnets)
            {
                if(!string.IsNullOrEmpty(subnet.NSGName))
                {
                    var nsg = GetNSGByName(subnet.NSGName);

                    withCreateSubnet
                            .DefineSubnet(subnet.Name)
                            .WithAddressPrefix(subnet.AddressSpace)
                            .WithExistingNetworkSecurityGroup(nsg)
                            .Attach();
                }
                else
                    withCreateSubnet
                        .DefineSubnet(subnet.Name)
                        .WithAddressPrefix(subnet.AddressSpace)
                        .Attach();
            }

            INetwork virtualnetwork = await withCreateSubnet.CreateAsync();
    
            provisionedVNets.Add(virtualnetwork.Name, virtualnetwork);
        }

        private async Task CreateNSGAsync(NSG nsg)
        {
            var existingNsg = GetNSGByName(nsg.Name);

            if(existingNsg != null)
                return;

            var ruleDef = AzClient.WithSubscription(_subscriptionId)
                .NetworkSecurityGroups
                .Define(nsg.Name)
                .WithRegion(nsg.Location)
                .WithExistingResourceGroup(nsg.ResourceGroupName);
                

            foreach(var inbound in nsg.InboundRules)
            {
                CreateNSGRule(ruleDef, inbound, true);
            }

            foreach(var outbound in nsg.OutboundRules)
            {
                CreateNSGRule(ruleDef, outbound, false);
            }

            INetworkSecurityGroup nsgCreated = await ruleDef.CreateAsync();

            _nsgs.Add(nsgCreated.Name, nsgCreated);            
        }

        private void CreateNSGRule
            (Microsoft.Azure.Management.Network.Fluent.NetworkSecurityGroup.Definition.IWithCreate rscGrpDef,
             NSGRule rule, bool isInboundRule)
        {
            IWithSourcePort<
                    Microsoft.Azure.Management.Network.Fluent
                    .NetworkSecurityGroup.Definition.IWithCreate> srcPortDef;
                
                IWithSourceAddressOrSecurityGroup<
                    Microsoft.Azure.Management.Network.Fluent
                    .NetworkSecurityGroup.Definition.IWithCreate> fromAddrDef;
                
                IWithDestinationAddressOrSecurityGroup<
                    Microsoft.Azure.Management.Network.Fluent
                        .NetworkSecurityGroup.Definition.IWithCreate> toDestAddrDef = null;
                
                IWithDestinationPort<
                    Microsoft.Azure.Management.Network.Fluent
                        .NetworkSecurityGroup.Definition.IWithCreate> toDestPortDef;
                
                IWithProtocol<
                    Microsoft.Azure.Management.Network.Fluent
                        .NetworkSecurityGroup.Definition.IWithCreate> protocolDef;


                //allow, deny def
                if(isInboundRule)
                {
                    if(rule.Allow)
                        fromAddrDef = rscGrpDef.DefineRule(rule.Name).AllowInbound();
                    else
                        fromAddrDef = rscGrpDef.DefineRule(rule.Name).DenyInbound();
                }
                else
                {
                     if(rule.Allow)
                        fromAddrDef = rscGrpDef.DefineRule(rule.Name).AllowOutbound();
                    else
                        fromAddrDef = rscGrpDef.DefineRule(rule.Name).DenyOutbound();
                }
                
                //src addr def
                if(rule.ToAddresses.Contains("*"))
                    srcPortDef = fromAddrDef.FromAnyAddress();
                else if(rule.FromAddresses.Contains(","))
                    srcPortDef = fromAddrDef.FromAddresses(rule.FromAddresses.Split(','));
                else
                    srcPortDef = fromAddrDef.FromAddress(rule.FromAddresses);

                //src port def
                if(rule.FromPorts == "*")
                    toDestAddrDef = srcPortDef.FromAnyPort();
                else
                {
                    //e.g 434-455,80,443,8000-8005
                    if(rule.FromPorts.Contains(","))
                        toDestAddrDef = srcPortDef.FromPortRanges(rule.FromPorts.Split(','));
                    
                    //e.g 434-455
                    else if(rule.FromPorts.Contains("-"))
                    {
                        string[] fromToSrcPorts = rule.FromPorts.Split('-');

                        if(fromToSrcPorts.Length != 2)
                            toDestAddrDef = srcPortDef.FromAnyPort();  //default to Any if received weird src ports with more than 1 hyphen
                        else
                        {
                            toDestAddrDef = srcPortDef.FromPortRange
                                (Convert.ToInt32(fromToSrcPorts[0]), Convert.ToInt32(fromToSrcPorts[1]));
                        }
                    }
                    //single src port, 80
                    else
                        toDestAddrDef = srcPortDef.FromPort(Convert.ToInt32(rule.FromPorts));
                }

                //to dest address def
                if(rule.ToAddresses.Contains("*"))
                    toDestPortDef = toDestAddrDef.ToAnyAddress();
                else if(rule.ToAddresses.Contains(","))
                    toDestPortDef = toDestAddrDef.ToAddresses(rule.ToAddresses.Split(','));
                else
                    toDestPortDef = toDestAddrDef.ToAddress(rule.ToAddresses); //single IP or Cidr
                    
                //to dest port def
                 if(rule.ToPorts == "*")
                    protocolDef = toDestPortDef.ToAnyPort();
                else
                {
                    //e.g 434-455,80,443,8000-8005
                    if(rule.ToPorts.Contains(","))
                        protocolDef = toDestPortDef.ToPortRanges(rule.ToPorts.Split(','));
                    
                    //e.g 434-455
                    else if(rule.ToPorts.Contains("-"))
                    {
                        string[] fromToDestPorts = rule.ToPorts.Split('-');

                        if(fromToDestPorts.Length != 2)
                            protocolDef = toDestPortDef.ToAnyPort();  //default to Any if received weird src ports with more than 1 hyphen
                        else
                        {
                            protocolDef = toDestPortDef.ToPortRange
                                (Convert.ToInt32(fromToDestPorts[0]), Convert.ToInt32(fromToDestPorts[1]));
                        }
                    }
                    //single src port, 80
                    else
                        protocolDef = toDestPortDef.ToPort(Convert.ToInt32(rule.ToPorts));
                }

                //protocol def
                if(rule.Protocol == "*")
                    protocolDef
                        .WithProtocol(SecurityRuleProtocol.Asterisk)
                        .WithPriority(rule.Priority)
                        .Attach();
                else
                {
                    FieldInfo protocolField = typeof(SecurityRuleProtocol)
                        .GetFields().FirstOrDefault(x => x.Name.ToLowerInvariant() == rule.Protocol.ToLowerInvariant());

                    SecurityRuleProtocol protocol = (SecurityRuleProtocol)protocolField.GetValue(null);

                    protocolDef
                        .WithProtocol(protocol)
                        .WithPriority(rule.Priority)
                        .Attach();
                }
        }

        private async Task CreateVMAsync(VM vm)
        {  
            INetwork vnet = GetVNetByName(vm.VNetName);
            
            var withPip = AzClient.WithSubscription(_subscriptionId)
                .VirtualMachines
                .Define(vm.Name)
                .WithRegion(vm.Location)
                .WithExistingResourceGroup(vm.ResourceGroupName)
                .WithExistingPrimaryNetwork(vnet)
                .WithSubnet(vm.SubnetName)
                .WithPrimaryPrivateIPAddressDynamic();
            
            var imgRef = new ImageReference()
            {
                Publisher = vm.VMPublisher,
                Offer = vm.VMOffer,
                Sku = vm.VMSKU,
                Version = vm.VMVersion
            };
            
            IWithProximityPlacementGroup vmContDefinition;
            
            if(vm.HasPublicIP) {
                var pip = AzClient.WithSubscription(_subscriptionId)
                .PublicIPAddresses.Define(vm.PublicIPName)
                .WithRegion(vm.Location)
                .WithExistingResourceGroup(vm.ResourceGroupName);

                vmContDefinition = withPip.WithNewPrimaryPublicIPAddress(pip);
            }
            else
                vmContDefinition = withPip.WithoutPrimaryPublicIPAddress();
            
            if(vm.IsLinux)
            {
                await vmContDefinition.WithSpecificLinuxImageVersion(imgRef)
                    .WithRootUsername(vm.AdminUsername)
                    .WithRootPassword(vm.AdminPassword)
                    .WithSize(vm.SizeName)
                    .CreateAsync();
            }
            else
            {
                await vmContDefinition.WithSpecificWindowsImageVersion(imgRef)
                    .WithAdminUsername(vm.AdminUsername)
                    .WithAdminPassword(vm.AdminPassword)
                    .WithSize(vm.SizeName)
                    .CreateAsync();
            }
            
        }
    
        private async Task CreateNLBAsync(NLB nlb)
        {
            var sku = LoadBalancerSkuType.Basic;
            if(nlb.IsStandardSku)
               sku = LoadBalancerSkuType.Standard;
            
            ICreatable<IPublicIPAddress> pip = null;
            if(!nlb.IsInternalNLB)
            {
                if(nlb.IsStandardSku)
                    pip = AzClient.WithSubscription(_subscriptionId)
                        .PublicIPAddresses
                        .Define(nlb.PublicIPName)
                        .WithRegion(nlb.Location)
                        .WithExistingResourceGroup(nlb.ResourceGroupName)
                        .WithSku(PublicIPSkuType.Standard)
                        .WithStaticIP();
                else
                    pip = AzClient.WithSubscription(_subscriptionId)
                        .PublicIPAddresses
                        .Define(nlb.PublicIPName)
                        .WithRegion(nlb.Location)
                        .WithExistingResourceGroup(nlb.ResourceGroupName)
                        .WithSku(PublicIPSkuType.Basic);
            }

            var nlbDefWithProtocol = AzClient
                .WithSubscription(_subscriptionId)
                .LoadBalancers.Define(nlb.Name)
                .WithRegion(nlb.Location)
                .WithExistingResourceGroup(nlb.ResourceGroupName)
                .DefineLoadBalancingRule(nlb.LoadBalancingRuleName)
                .WithProtocol(TransportProtocol.Tcp);

            if(nlb.IsInternalNLB)
            {
                INetwork vnet = GetVNetByName(nlb.VNetName);

                await nlbDefWithProtocol
                    .FromExistingSubnet(vnet, nlb.SubnetName)
                    .FromFrontendPort(nlb.FrontendPort)
                    .ToBackend(nlb.BackendpoolName)
                    .Attach()
                    .WithSku(sku)
                    .CreateAsync();
            }
            else
                await nlbDefWithProtocol
                    .FromNewPublicIPAddress(pip)
                    .FromFrontendPort(nlb.FrontendPort)
                    .ToBackend(nlb.BackendpoolName)
                    .Attach()
                    .WithSku(sku)
                    .CreateAsync();
        }

        private async Task CreateAppService(WebApp webapp)
        {
           FieldInfo tier =
            typeof(PricingTier).GetFields().FirstOrDefault(x => x.Name == webapp.PricingTier);
           
           PricingTier pricingTier = (PricingTier) tier.GetValue(null);

           FieldInfo runtime =
            typeof(RuntimeStack).GetFields().FirstOrDefault(x => x.Name == webapp.RuntimeStack);
            
            RuntimeStack runtimeStack = (RuntimeStack) runtime.GetValue(null);

            var pricingTierDef = AzClient.WithSubscription(_subscriptionId)
                .AppServices
                .AppServicePlans
                .Define(webapp.Name)
                .WithRegion(webapp.Location)
                .WithExistingResourceGroup(webapp.ResourceGroupName)
                .WithPricingTier(pricingTier);
            
            ICreatable<IAppServicePlan> appServicePlan;

            if(webapp.IsLinux)
            {
                appServicePlan = pricingTierDef.WithOperatingSystem
                    (Microsoft.Azure.Management.AppService.Fluent.OperatingSystem.Linux);
            }
            else
            {
                appServicePlan = pricingTierDef.WithOperatingSystem
                    (Microsoft.Azure.Management.AppService.Fluent.OperatingSystem.Windows);
            }
                

            var apvsvcPlanDef = AzClient.WithSubscription(_subscriptionId)
                .AppServices
                .WebApps
                .Define(webapp.Name)
                .WithRegion(webapp.Location)
                .WithExistingResourceGroup(webapp.ResourceGroupName);
            
            if(webapp.IsLinux)
                 await apvsvcPlanDef
                    .WithNewLinuxPlan(appServicePlan)
                    .WithBuiltInImage(runtimeStack)
                    .WithWebAppAlwaysOn(true)
                    .CreateAsync();
            else
                await apvsvcPlanDef
                    .WithNewWindowsPlan(appServicePlan)
                    .WithWebAppAlwaysOn(true)
                    .CreateAsync();
        }

        private async Task  CreateLAWAsync(LogAnalytics law)
        {
            using(var omsClient = new OperationalInsightsManagementClient(AzureCreds))
            {
                omsClient.SubscriptionId = _subscriptionId;

                await omsClient.Workspaces.CreateOrUpdateAsync
                    (law.ResourceGroupName, law.Name,new Workspace(law.Location));
            }
        }

        private async Task CreateStorageAccountAsync(Model.StorageAccount storage)
        {
            
           var trafficAccessDef = AzClient.WithSubscription(_subscriptionId)
                .StorageAccounts
                .Define(storage.Name)
                .WithRegion(storage.Location)
                .WithExistingResourceGroup(storage.ResourceGroupName)
                .WithAccessFromAllNetworks()
                .WithOnlyHttpsTraffic();
            
            FieldInfo acctTypeField = typeof(StorageAccountSkuType)
                    .GetFields().FirstOrDefault(x => x.Name.ToLowerInvariant() == storage.SkuName.ToLowerInvariant());

            StorageAccountSkuType acctSku = (StorageAccountSkuType)acctTypeField.GetValue(null);

            await trafficAccessDef.WithSku(acctSku)
            .WithGeneralPurposeAccountKindV2()
            .CreateAsync();
        }

        private INetwork GetVNetByName(string vnetName)
        {
           return  _vnets.Values.FirstOrDefault(x => x.Name == vnetName);
        }

        private INetworkSecurityGroup GetNSGByName(string nsgName)
        {
            return _nsgs.Values.FirstOrDefault(x => x.Name ==nsgName );
        }
        
        private Dictionary<string, INetwork> _vnets = new Dictionary<string, INetwork>();
        private Dictionary<string, INetworkSecurityGroup> _nsgs = new Dictionary<string, INetworkSecurityGroup>();
        private string _subscriptionId;
    }
}