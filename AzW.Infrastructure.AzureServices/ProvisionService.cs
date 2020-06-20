using AzW.Model;
using Microsoft.Azure.Management.Monitor.Fluent;
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
using Microsoft.Azure.Management.AppService.Fluent.Models;
using System.Reflection;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.ResourceActions;
using Microsoft.Azure.Management.Network.Fluent.NetworkSecurityRule.Definition;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.GroupableResource.Definition;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core.ChildResource.Definition;
using Microsoft.Azure.Management.Storage.Fluent;
using Microsoft.Azure.Management.OperationalInsights;
using Microsoft.Azure.Management.OperationalInsights.Models;
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.CosmosDB.Fluent.Models;
using System.IO;
using System.Dynamic;
using Microsoft.Azure.Management.ResourceManager.Fluent.Models;
using Microsoft.Azure.Management.ApplicationInsights.Management;
using Microsoft.Azure.Management.ApplicationInsights.Management.Models;
using Microsoft.Azure.Management.RecoveryServices;
using Microsoft.Azure.Management.RecoveryServices.Backup;
using Microsoft.Azure.Management.RecoveryServices.Models;
using Microsoft.Azure.Management.RecoveryServices.Backup.Models;

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        private string _contentRootPath;

        public ProvisionService
            (string subscriptionId, WorkbenchSecret secret) : base(secret)
        {
            _subscriptionId = subscriptionId;
            //_contentRootPath = contentRootPath;
        }

        public async Task<ProvisionResult> ProvisionAsync(dynamic[] provisionContexts)
        {
            var provisionResult = new ProvisionResult();

            try
            {
                if(provisionContexts != null && provisionContexts.Length > 0)
                {
                    foreach(dynamic context in provisionContexts)
                    {
                        JObject jObj = JObject.Parse(context.ToString());
                        string resourceType = jObj["ResourceType"].ToString();

                        switch(resourceType)
                        {
                            case ResourceType.NSG:
                                NSG nsg = jObj.ToObject<NSG>();
                                await CreateNSGAsync(nsg);
                            break;
                            case ResourceType.VNet:
                                VNet vnet = jObj.ToObject<VNet>();
                                await CreateVNetAsync(vnet);
                            break;
                            case ResourceType.VM:
                                VM vm = jObj.ToObject<VM>();
                                await CreateVMAsync(vm);
                            break;
                            case ResourceType.WindowsVM:
                                VM windowsVM = jObj.ToObject<VM>();
                                await CreateVMAsync(windowsVM);
                            break;
                            case ResourceType.LinuxVM:
                                VM linuxVM = jObj.ToObject<VM>();
                                await CreateVMAsync(linuxVM);
                            break;
                            case ResourceType.NLB:
                                NLB nlb = jObj.ToObject<NLB>();
                                await CreateNLBAsync(nlb);
                            break;
                            case ResourceType.AppGw:
                                AppGateway appgw = jObj.ToObject<AppGateway>();
                                await CreateAppGatewayAsync(appgw);
                            break;
                            case ResourceType.Firewall:
                                Firewall fw = jObj.ToObject<Firewall>();
                                await CreateAzFirewallAsync(fw);
                            break;
                            case ResourceType.AppService:
                                WebApp webapp = jObj.ToObject<WebApp>();
                                await CreateAppService(webapp);
                            break;
                            case ResourceType.ASE:
                                ASE ase = jObj.ToObject<ASE>();
                                await CreateAppServiceEnvironment(ase);
                            break;
                            case ResourceType.Function:
                                Function func = jObj.ToObject<Function>();
                                await CreateFunction(func);
                            break;
                            case ResourceType.StorageAccount:
                                Model.StorageAccount blob = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(blob);
                            break;
                            case ResourceType.AzFile:
                                Model.StorageAccount file = jObj.ToObject<Model.StorageAccount>();
                                await CreateStorageAccountAsync(file);
                            break;
                            case ResourceType.LogAnalytics:
                                LogAnalytics law = jObj.ToObject<LogAnalytics>();
                                await CreateLAWAsync(law);
                            break;
                            case ResourceType.AppInsights:
                                AppInsights appinsights = jObj.ToObject<AppInsights>();
                                await CreateAppInsightsAsync(appinsights);
                            break;
                            case ResourceType.CosmosDB:
                                CosmosDB cosmos = jObj.ToObject<CosmosDB>();
                                await CreateCosmosAsync(cosmos);
                            break;
                            case ResourceType.RecoveryServiceVault:
                                RecoveryServiceVault rsv = jObj.ToObject<RecoveryServiceVault>();
                                await CreateRecoveryServiceVault(rsv);
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

        private async Task CreateVNetAsync(VNet vnet)
        {             
            //service endpoint
            //https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview
                
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

            //update subnets with service endpoints
            foreach(var createdSubnet in vnet.Subnets)
            {
                foreach(var svcendpoint in createdSubnet.ServiceEndpointTargetServices)
                {
                    await virtualnetwork.Update()
                    .UpdateSubnet(createdSubnet.Name)
                    .WithAccessFromService(ServiceEndpointType.Parse(svcendpoint))
                    .Parent()
                    .ApplyAsync();
                }
            }
            
            //add to global list for resource reference
            _vnets.Add(virtualnetwork.Name, virtualnetwork);
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
                if(isNSGRuleHaveEmptyFields(inbound))
                    continue;

                CreateNSGRule(ruleDef, inbound, true);
            }

            foreach(var outbound in nsg.OutboundRules)
            {
                if(isNSGRuleHaveEmptyFields(outbound))
                    continue;

                CreateNSGRule(ruleDef, outbound, false);
            }

            INetworkSecurityGroup nsgCreated = await ruleDef.CreateAsync();

            _nsgs.Add(nsgCreated.Name, nsgCreated);            
        }

        private bool isNSGRuleHaveEmptyFields(NSGRule rule) {
            if(String.IsNullOrEmpty(rule.Name) || 
                String.IsNullOrEmpty(rule.ToAddresses) ||
                String.IsNullOrEmpty(rule.FromAddresses))
                return true;
            else
                return false;
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
            IVirtualMachine existingVM = AzClient
                .WithSubscription(_subscriptionId)
                .VirtualMachines
                .GetByResourceGroup(vm.ResourceGroupName, vm.Name);
            
            if(existingVM != null)
            {
                _vms.Add(existingVM.Name, existingVM);
                return;
            }

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
            
            IVirtualMachine azvm;
            
            if(vm.IsLinux)
            {
                azvm = await vmContDefinition.WithSpecificLinuxImageVersion(imgRef)
                    .WithRootUsername(vm.AdminUsername)
                    .WithRootPassword(vm.AdminPassword)
                    .WithSize(vm.SizeName)
                    .CreateAsync();
            }
            else
            {
                azvm = await vmContDefinition.WithSpecificWindowsImageVersion(imgRef)
                    .WithAdminUsername(vm.AdminUsername)
                    .WithAdminPassword(vm.AdminPassword)
                    .WithSize(vm.SizeName)
                    .CreateAsync();
            }

            //add to global list for resource reference
            _vms.Add(vm.Name, azvm);
        }
    
        private async Task CreateNLBAsync(NLB nlb)
        {
            var sku = LoadBalancerSkuType.Basic;
            if(nlb.IsStandardSku)
               sku = LoadBalancerSkuType.Standard;
            
            var nlbDefWithProtocol = AzClient
                .WithSubscription(_subscriptionId)
                .LoadBalancers.Define(nlb.Name)
                .WithRegion(nlb.Location)
                .WithExistingResourceGroup(nlb.ResourceGroupName)
                .DefineLoadBalancingRule(nlb.LoadBalancingRuleName)
                .WithProtocol(TransportProtocol.Tcp);

             Microsoft.Azure.Management.Network.Fluent.
                LoadBalancingRule.Definition.IWithBackend
                    <Microsoft.Azure.Management.Network.Fluent.LoadBalancer
                    .Definition.IWithLBRuleOrNatOrCreate> lbruleDef = null;
            
            if(nlb.IsInternalNLB)
            {
                INetwork vnet = GetVNetByName(nlb.VNetName);

                lbruleDef = nlbDefWithProtocol
                                .FromExistingSubnet(vnet, nlb.SubnetName)
                                .FromFrontendPort(nlb.FrontendPort);

                if(nlb.LoadBalanceToExistingVMNames.Length > 0)
                {
                    var vms = GetLBVMs(nlb.LoadBalanceToExistingVMNames);

                    await lbruleDef
                        .ToExistingVirtualMachines(new List<IHasNetworkInterfaces>(vms))
                        .Attach()
                        .WithSku(sku)
                        .CreateAsync(); 
                }
                else
                {
                    await lbruleDef
                        .ToBackend(nlb.BackendpoolName)
                        .Attach()
                        .WithSku(sku)
                        .CreateAsync(); 
                    
                }
            }
            //public NLB
            else
            {              
                //create new public ip for nlb
                 var pipSkuDef =  AzClient.WithSubscription(_subscriptionId)
                        .PublicIPAddresses
                        .Define(nlb.PublicIPName)
                        .WithRegion(nlb.Location)
                        .WithExistingResourceGroup(nlb.ResourceGroupName);

                PublicIPSkuType pipSku = PublicIPSkuType.Basic;

                if(nlb.IsStandardSku)
                    pipSku = PublicIPSkuType.Standard;
                
                var newPIP = await pipSkuDef
                    .WithSku(pipSku)
                    .CreateAsync();
                    
            
                lbruleDef = nlbDefWithProtocol
                    .FromExistingPublicIPAddress(newPIP)
                    .FromFrontendPort(nlb.FrontendPort);

                if(nlb.LoadBalanceToExistingVMNames.Length > 0)
                {
                    var vms = GetLBVMs(nlb.LoadBalanceToExistingVMNames);

                    await lbruleDef
                        .ToExistingVirtualMachines(new List<IHasNetworkInterfaces>(vms))
                        .Attach()
                        .WithSku(sku)
                        .CreateAsync(); 
                }
                else
                {
                    await lbruleDef
                        .ToBackend(nlb.BackendpoolName)
                        .Attach()
                        .WithSku(sku)
                        .CreateAsync(); 
                    
                }
            }
        }

        private async Task CreateAppGatewayAsync(AppGateway appgw)
        {
           var routingRuleDef = AzClient
                .WithSubscription(_subscriptionId)
                .ApplicationGateways
                .Define(appgw.Name)
                .WithRegion(appgw.Location)
                .WithExistingResourceGroup(appgw.ResourceGroupName)
                .DefineRequestRoutingRule(appgw.RoutingRuleName);

            var subnet = GetSubnet(appgw.VNetName, appgw.SubnetName);

            ApplicationGatewayTier tier = ApplicationGatewayTier.StandardV2;
            ApplicationGatewaySkuName sku = ApplicationGatewaySkuName.StandardV2;

            if(appgw.WAFEnabled)
            {
                tier = ApplicationGatewayTier.WAFV2;
                sku = ApplicationGatewaySkuName.WAFV2;
            }

            var standardPip =
                await CreateStandardPublicIP($"pip-{appgw.Name}", appgw.Location, appgw.ResourceGroupName);

            string[] privateIPs = GetVMPrivateIPAddress(appgw.LoadBalanceToExistingVMNames);

                
            var appgwBackendpoolDef =  routingRuleDef
                .FromListener(appgw.FrontendListenerName)
                .ToBackendHttpPort(appgw.BackendPort)               
                .ToBackend(appgw.BackendPoolName)
                .Attach()

            .DefineListener(appgw.FrontendListenerName)
                .WithPublicFrontend()
                .WithFrontendPort(80)
                .WithHttp()
                .Attach()

                .DefineBackend(appgw.BackendPoolName);

                foreach(string privateip in privateIPs)
                {
                    if(!string.IsNullOrEmpty(privateip))
                        appgwBackendpoolDef.WithIPAddress(privateip);
                    else
                        appgwBackendpoolDef.WithIPAddress("");
                }

                await appgwBackendpoolDef.Attach()

                .DefineBackendHttpConfiguration("httpsettings-http-80")
                    .WithProtocol(ApplicationGatewayProtocol.Http)
                    .WithPort(appgw.BackendPort)
                    .Attach()

                .DefineProbe("probe-http-80")
                    .WithHost("www.contoso.com")
                    .WithPath("/")
                    .WithProtocol(ApplicationGatewayProtocol.Http)
                    .WithTimeoutInSeconds(30)
                    .Attach()

                .WithExistingPublicIPAddress(standardPip)
                .WithExistingSubnet(subnet)
                .WithInstanceCount(appgw.NumberofInstances)
                .WithTier(tier)
                .WithSize(sku)
                .CreateAsync();

        }

        private async Task CreateAzFirewallAsync(Firewall firewall)
        {
            var subnet = GetSubnet(firewall.VNetName, firewall.SubnetName);

            var pip = await CreateStandardPublicIP
                ($"pip-azfw-{firewall.ResourceGroupName}",firewall.Location, firewall.ResourceGroupName);

            await AzClient
                .WithSubscription(_subscriptionId)
                .AzureFirewalls
                .Define(firewall.Name)
                .WithExistingResourceGroup(firewall.ResourceGroupName)
                .WithRegion(firewall.Location)
                .DefineAzureFirewallIpConfiguration("azfw-ip-config")
                .WithSubnet(subnet.Inner.Id)
                .WithPublicIpAddress(pip.Id)
                .Attach()
                .CreateAsync();
        }

        private async Task<IPublicIPAddress> CreateStandardPublicIP(string name, string location, string rg)
        {
            return await AzClient.WithSubscription(_subscriptionId)
                .PublicIPAddresses
                .Define(name)
                .WithRegion(location)
                .WithExistingResourceGroup(rg)
                .WithSku(PublicIPSkuType.Standard)
                .WithStaticIP()
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

        private async Task CreateAppServiceEnvironment(ASE ase)
        {
            string aseArmJsonPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"), "ase-azuredeploy.json");
            string armJson = File.ReadAllText(aseArmJsonPath);
            
            string aseArmParamPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"), "ase-azuredeploy.parameters.json");
            string armParamJsonRaw = File.ReadAllText(aseArmParamPath);

            var jobj = JObject.Parse(armParamJsonRaw);
            jobj["aseName"]["value"] = ase.Name;
            jobj["aseLocation"]["value"] = ase.Location;
            jobj["existingVirtualNetworkName"]["value"] = ase.VNetName;
            jobj["existingVirtualNetworkResourceGroup"]["value"] = ase.ResourceGroupName;
            jobj["subnetName"]["value"] = ase.SubnetName;

            if(ase.IsInternalASE)
                jobj["internalLoadBalancingMode"]["value"] = 3;
            else
                jobj["internalLoadBalancingMode"]["value"] = 0;

            string paramJson = jobj.ToString(Newtonsoft.Json.Formatting.None);

            await AzClient.WithSubscription(_subscriptionId)
                .Deployments.Define("ase-deployment")
                .WithExistingResourceGroup(ase.ResourceGroupName)
                .WithTemplate(armJson)
                .WithParameters(paramJson)
                .WithMode(DeploymentMode.Incremental)
                .CreateAsync();
        }

        private async Task CreateFunction(Function func)
        {
            if(func.IsConsumptionPlan)
            {
                await AzClient.WithSubscription(_subscriptionId)
                    .AppServices
                    .FunctionApps
                    .Define(func.Name)
                    .WithRegion(func.Location)
                    .WithExistingResourceGroup(func.ResourceGroupName)
                    .WithWebAppAlwaysOn(true)
                    .CreateAsync();
            }
            else
            //app service plan
            {
                FieldInfo tier =
                    typeof(PricingTier).GetFields().FirstOrDefault(x => x.Name == func.PricingTier);
           
                PricingTier pricingTier = (PricingTier) tier.GetValue(null);

                var osDef = AzClient.WithSubscription(_subscriptionId)
                .AppServices
                .AppServicePlans
                .Define(func.Name)
                .WithRegion(func.Location)
                .WithExistingResourceGroup(func.ResourceGroupName)
                .WithPricingTier(pricingTier);

                IAppServicePlan asp = null;

                if(func.IsLinux)
                    asp = await osDef.WithOperatingSystem(Microsoft.Azure.Management.AppService.Fluent.OperatingSystem.Linux)
                    .CreateAsync();
                else
                    asp = await osDef.WithOperatingSystem(Microsoft.Azure.Management.AppService.Fluent.OperatingSystem.Windows)
                    .CreateAsync();
                
                
                await AzClient.WithSubscription(_subscriptionId)
                .AppServices
                .FunctionApps
                .Define(func.Name)
                .WithExistingAppServicePlan(asp)
                .WithExistingResourceGroup(func.ResourceGroupName)
                .CreateAsync();
            }
        
                
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

        private async Task CreateRecoveryServiceVault(RecoveryServiceVault vault)
        {
            var vmsToBackup = new List<string>();

            //to handle scenario on VM selected for backup, but was deleted
            foreach(var vm in vault.VMNamesToBackup)
            {
                if(GetVMByName(vm) != null)
                    vmsToBackup.Add(vm);
            }

            string backupPolicyName = "DailyBackupPolicy";

            string asrArmJsonPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"),
                "rscandpolicy-azuredeploy.json");
            string asrJson = File.ReadAllText(asrArmJsonPath);
            
            string asrArmParamPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"),
                "rscandpolicy-azuredeploy.parameters.json");
            string asraramJsonRaw = File.ReadAllText(asrArmParamPath);

            var jobj = JObject.Parse(asraramJsonRaw);
            jobj["vaultName"]["value"] = vault.Name;
            jobj["policyName"]["value"] = backupPolicyName;

            string paramJson = jobj.ToString(Newtonsoft.Json.Formatting.None);

            await AzClient.WithSubscription(_subscriptionId)
                .Deployments.Define("asr-deployment")
                .WithExistingResourceGroup(vault.ResourceGroupName)
                .WithTemplate(asrJson)
                .WithParameters(paramJson)
                .WithMode(DeploymentMode.Incremental)
                .CreateAsync();

            string enableVMBackupArmJsonPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"),
                "enablevmvackup-azuredeploy.json");
            string enableVMBackupJson = File.ReadAllText(enableVMBackupArmJsonPath);

            if(vmsToBackup.Count == 0)
                return;
            
            string enableVMBackupArmParamPath =
                Path.Combine(Path.Combine(AppContext.BaseDirectory, "armtemplate"),
                "enablevmvackup-azuredeploy.parameters.json");
            string enableVMBackuparamJsonRaw = File.ReadAllText(enableVMBackupArmParamPath);

            var enableVMBackupJobj = JObject.Parse(enableVMBackuparamJsonRaw);
            enableVMBackupJobj["existingVirtualMachinesResourceGroup"]["value"] = vault.ResourceGroupName;
            enableVMBackupJobj["existingRecoveryServicesVault"]["value"] = vault.Name;
            enableVMBackupJobj["existingVirtualMachines"]["value"] = new JArray(vmsToBackup.ToArray());
            enableVMBackupJobj["existingBackupPolicy"]["value"] = backupPolicyName;

            string enableVMBackupParamJson =
                enableVMBackupJobj.ToString(Newtonsoft.Json.Formatting.None);

            await AzClient.WithSubscription(_subscriptionId)
                .Deployments.Define("asr-enablevmbackup-deployment")
                .WithExistingResourceGroup(vault.ResourceGroupName)
                .WithTemplate(enableVMBackupJson)
                .WithParameters(enableVMBackupParamJson)
                .WithMode(DeploymentMode.Incremental)
                .CreateAsync();
            

        }

        private async Task CreateAppInsightsAsync(AppInsights appinsights)
        {
           using(var appInsightsClient = new ApplicationInsightsManagementClient(AzureCreds))
            {
                appInsightsClient.SubscriptionId = _subscriptionId;

                await appInsightsClient.Components.CreateOrUpdateAsync(
                    appinsights.ResourceGroupName, appinsights.Name,
                    new ApplicationInsightsComponent()
                    {
                        Location = appinsights.Location,
                        Kind = "web",
                        ApplicationType = "web"
                    }
                );
            }           
        }

        private async Task CreateCosmosAsync(CosmosDB cosmos)
        {
           var rgDef = AzClient
                .WithSubscription(_subscriptionId)
                .CosmosDBAccounts.Define(cosmos.Name)
                .WithRegion(cosmos.Location)
                .WithExistingResourceGroup(cosmos.ResourceGroupName);

            Microsoft.Azure.Management.CosmosDB.Fluent.CosmosDBAccount.Definition.IWithConsistencyPolicy
                consistencyPolicyDef = null;
            
            if(cosmos.CosmosDBType == CosmosDBType.Cassandra.ToString())
                consistencyPolicyDef = rgDef.WithDataModelCassandra();
            else if(cosmos.CosmosDBType == CosmosDBType.Gremlin.ToString())
                consistencyPolicyDef = rgDef.WithDataModelGremlin();
            else if(cosmos.CosmosDBType == CosmosDBType.Mongo.ToString())
                consistencyPolicyDef =  rgDef.WithDataModelMongoDB();// rgDef.WithKind(DatabaseAccountKind.MongoDB);
            else if(cosmos.CosmosDBType == CosmosDBType.SQL.ToString())
                consistencyPolicyDef =  rgDef.WithDataModelSql();//rgDef.WithKind(DatabaseAccountKind.GlobalDocumentDB);
            
            await consistencyPolicyDef
                .WithSessionConsistency()
                .WithDefaultWriteReplication()
                .CreateAsync();      
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

        //helpers

        private IVirtualMachine GetVMByName(string name)
        {
            return _vms.FirstOrDefault(x => x.Key == name).Value;
        }

        private IEnumerable<IVirtualMachine> GetLBVMs(string[] vmNames)
        {
            var vmsToLB = new List<IVirtualMachine>();

            foreach(string name in vmNames)
            {
               var vm = _vms.Values.FirstOrDefault(x => x.Name == name);

               if(vm != null)
               {
                   vmsToLB.Add(vm);
               }
            }

            return vmsToLB;
        }

        private INetwork GetVNetByName(string vnetName)
        {
           return  _vnets.Values.FirstOrDefault(x => x.Name == vnetName);
        }

        private ISubnet GetSubnet(string vnetName, string subnetName)
        {
            var vnet = GetVNetByName(vnetName);

            return vnet.Subnets.Values.FirstOrDefault(x => x.Name == subnetName);
        }

        private string[] GetVMPrivateIPAddress(string[] vmNames)
        {
            var vms = GetLBVMs(vmNames);

            var vmIPs = new List<string>();

            foreach(var vm in vms)
            {
                string privateIP =
                    _vms.Values.FirstOrDefault()
                    .GetPrimaryNetworkInterface()
                    .IPConfigurations.FirstOrDefault().Value.PrivateIPAddress;

                vmIPs.Add(privateIP);
            }

            return vmIPs.ToArray();
        }

        private INetworkSecurityGroup GetNSGByName(string nsgName)
        {
            return _nsgs.Values.FirstOrDefault(x => x.Name ==nsgName );
        }
        
        private Dictionary<string, IVirtualMachine> _vms = new Dictionary<string, IVirtualMachine>();
        private Dictionary<string, INetwork> _vnets = new Dictionary<string, INetwork>();
        private Dictionary<string, INetworkSecurityGroup> _nsgs = new Dictionary<string, INetworkSecurityGroup>();
        private string _subscriptionId;
    }
}