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

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(string subscriptionId, string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            _subscriptionId = subscriptionId;
        }

        public async Task<ProvisionResult> ProvisionAsync(dynamic[] provisionContexts)
        {
            var provisionResult = new ProvisionResult();

            try
            {
                foreach(dynamic context in provisionContexts)
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

        private async Task CreateVNetAsync(VNet vnet, Dictionary<string, INetwork> provisionedVNets)
        {      
           var subnets = GetSubnets(vnet.Subnets);

           INetwork virtualnetwork = await AzClient.WithSubscription(_subscriptionId)
                .Networks.Define(vnet.Name)
                .WithRegion(vnet.Location)
                .WithExistingResourceGroup(vnet.ResourceGroupName)
                .WithAddressSpace(vnet.AddressSpace)
                .WithSubnets(subnets)
                .CreateAsync();
        
            provisionedVNets.Add(virtualnetwork.Name, virtualnetwork);
        }

        private Dictionary<string,string> GetSubnets(IEnumerable<Subnet> subnets)
        {
            var dictionary = new Dictionary<string,string>();

            foreach(var subnet in subnets)
            {
                dictionary.Add(subnet.Name, subnet.AddressSpace);
            }

            return dictionary;
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
                    .FromNewPublicIPAddress()
                    .FromFrontendPort(nlb.FrontendPort)
                    .ToBackend(nlb.BackendpoolName)
                    .Attach()
                    .WithSku(sku)
                    .CreateAsync();
        }

        private INetwork GetVNetByName(string vnetName)
        {
           return  _vnets.Values.FirstOrDefault(x => x.Name == vnetName);
        }
        
        private Dictionary<string, INetwork> _vnets = new Dictionary<string, INetwork>();
        private string _subscriptionId;
    }
}