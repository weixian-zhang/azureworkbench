
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Rest.Azure;

namespace AzW.Infrastructure.AzureServices
{
    public class ARMRService : BaseService, IResourceManagerService
    {
        public ARMRService(AzSDKCredentials sdkCred) : base(sdkCred)
        {  
            _sdkCreds = sdkCred;
        }

        public async Task<IEnumerable<IResourceGroup>> GetResourceGroups(string subscriptionId)
        {
            var rgs = 
                await AzAuthClient.WithDefaultSubscription().ResourceGroups.ListAsync();

            return rgs;
        }

        public async Task<IEnumerable<ISubscription>> GetSubscriptions()
        {
            var subs = 
                await AzAuthClient.WithDefaultSubscription().Subscriptions.ListAsync();

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
