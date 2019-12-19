
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Rest.Azure;

namespace AzW.Infrastructure.Azure
{
    public class ResourceManagerService : BaseService, IResourceManagerService
    {
        public ResourceManagerService(AzSDKCredentials sdkCred)
        {  
            _sdkCreds = sdkCred;
        }

        public async Task<IEnumerable<ResourceGroup>> GetResourceGroups(string subscriptionId)
        {
            ISubscriptionClient subClient = new SubscriptionClient(_sdkCreds);
            
            var rmClient = new ResourceManagementClient(_sdkCreds);

            rmClient.SubscriptionId = subscriptionId;

            var rgs = await rmClient.ResourceGroups.ListAsync();

            return rgs;
        }

        public async Task<IEnumerable<Subscription>> GetSubscriptions()
        {
            ISubscriptionClient subClient = new SubscriptionClient(_sdkCreds);

            IPage<Subscription> subs =  await subClient.Subscriptions.ListAsync();

            return subs;
        }

        public IEnumerable<string> GetLocations()
        {
            var regions = new List<string>();

            var props = TypeDescriptor.GetProperties(typeof(Region));

            foreach(PropertyDescriptor prop in props)
            {
                if(!prop.Name.ToLowerInvariant().Contains("government"))
                    regions.Add(prop.Name);
            }

            return regions;
        }

        private AzSDKCredentials _sdkCreds;
    }
}
