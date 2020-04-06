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

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(string subscriptionId, string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            _subscriptionId = subscriptionId;
        }

        public async Task ProvisionAsync(dynamic[] provisionContexts)
        {
            var provisionedVNets = new Dictionary<string, INetwork>();

            foreach(dynamic context in provisionContexts)
            {
                JObject jObj = JObject.Parse(context.ToString());
                string resourceType = jObj["ResourceType"].ToString();

                switch(resourceType)
                {
                    case ResourceType.VNet:
                        VNet vnet = jObj.ToObject<VNet>();
                        await CreateVNetAsync(vnet, provisionedVNets);
                    break;
                    case ResourceType.VM:
                        VM vm = jObj.ToObject<VM>();
                        await CreateVMAsync(provisionedVNets, vm);
                    break;
                }
            }
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

        private async Task CreateVMAsync(Dictionary<string, INetwork> provisionedVNets, VM vm)
        {  
            INetwork vnet = provisionedVNets.Values.FirstOrDefault(x => x.Name == vm.VNetName);
            
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
                Publisher = vm.Publisher,
                Offer = vm.Offer,
                Sku = vm.SKU,
                Version = vm.Version
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

            await vmContDefinition.WithSpecificWindowsImageVersion(imgRef)
            .WithAdminUsername(vm.AdminUsername)
            .WithAdminPassword(vm.AdminPassword)
            .CreateAsync();
        }
    
        private string _subscriptionId;
    }
}