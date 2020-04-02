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

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(AzSubscription subscription, string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            _subscription = subscription;
        }

        public async Task ProvisionAsync(JArray resourceIcons)
        {
            
            foreach(var jobj in resourceIcons.Children<JObject>())
            {
                string resourceType = (string)jobj.SelectToken("ProvisionContext.ResourceType");

                switch(resourceType){
                    case ResourceType.VNet:
                    await CreateVNet(jobj.ToObject<VNet>());
                    break;
                }
            }

            // AzAuthClient.WithSubscription("").Networks.Define("").WithRegion("")
            // .WithExistingResourceGroup("").WithAddressSpace("")
            // .WithSubnet()


            // AzAuthClient.WithDefaultSubscription().VirtualMachines.Define("")
            // .WithRegion("")
            // .WithExistingResourceGroup("")
            // .WithExistingPrimaryNetwork(vnet)
            // .WithSubnet("")
            // .WithPrimaryPrivateIPAddressDynamic()
            // .WithNewPrimaryPublicIPAddress()
            // .WithLatestWindowsImage("publisher", "offer", "sku")
            // //.WithLatestLinuxImage("publisher", "offer", "sku")

            throw new System.NotImplementedException();
        }

        private async Task CreateVNet(VNet vnet)
        {
           await CreateResourceGroupIfNotExistAsync(vnet.ResourceGroup, vnet.Region);

           AzClient.WithSubscription(_subscription.SubscriptionId)
                .Networks.Define("")
                .WithRegion(vnet.Region)
                .WithExistingResourceGroup(vnet.ResourceGroup)
                .WithAddressSpace(vnet.AddressSpace)
                .WithSubnets(new Dictionary<string,string>(){{"",""}})
                .Create();
        }
    
        private async Task<bool> CreateResourceGroupIfNotExistAsync(string rgName, string region)
        {
            bool exists = await AzClient
                .WithSubscription(_subscription.SubscriptionId)
                .ResourceGroups.ContainAsync(rgName);
            if(!exists)
                await AzClient
                    .WithSubscription(_subscription.SubscriptionId)
                    .ResourceGroups.Define(rgName)
                    .WithRegion(region)
                    .CreateAsync();

            return exists;
        }

        private AzSubscription _subscription;
    }
}