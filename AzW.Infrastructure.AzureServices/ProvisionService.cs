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
        public ProvisionService(string subscriptionId, string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            _subscriptionId = subscriptionId;
        }

        public async Task ProvisionAsync(dynamic[] provisionContexts)
        {
            
            foreach(dynamic context in provisionContexts)
            {
                JObject jObj = JObject.Parse(context.ToString());
                string resourceType = jObj["ResourceType"].ToString();

                switch(resourceType)
                {
                    case ResourceType.VNet:
                        VNet vnet = jObj.ToObject<VNet>();
                        await CreateVNetAsync(vnet);
                    break;
                }
            }
        }

        private async Task CreateVNetAsync(VNet vnet)
        {
        //    await CreateResourceGroupIfNotExistAsync
        //     (vnet.ResourceGroupName, vnet.);
        
           var subnets = GetSubnets(vnet.Subnets);

           await AzClient.WithSubscription(_subscriptionId)
                .Networks.Define(vnet.Name)
                .WithRegion(vnet.Location)
                .WithExistingResourceGroup(vnet.ResourceGroupName)
                .WithAddressSpace(vnet.AddressSpace)
                .WithSubnets(subnets)
                .CreateAsync();
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
    
        private async Task<bool> CreateResourceGroupIfNotExistAsync(string rgName, string region)
        {
            bool exists = await AzClient
                .WithSubscription(_subscriptionId)
                .ResourceGroups.ContainAsync(rgName);
            if(!exists)
                await AzClient
                    .WithSubscription(_subscriptionId)
                    .ResourceGroups.Define(rgName)
                    .WithRegion(region)
                    .CreateAsync();

            return exists;
        }

        private string _subscriptionId;
    }
}