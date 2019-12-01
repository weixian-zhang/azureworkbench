using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AzW.Model;
using Microsoft.Azure.Management;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Identity.Client;
using Microsoft.Rest.Azure;

namespace AzW.Infrastructure
{
    public class AzArmService : BaseService, IAzArmService
    {
        public AzArmService(AzSDKCredentials sdkCred)
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

            // var rgList = new List<AzResourceGroup>();

            // foreach(var rg in rgs)
            // {
            //     rgList.Add(new AzResourceGroup(){
            //         Name = rg.Name,
            //         Id = rg.Id,
            //         Loction = rg.Location
            //     });
            // }

            // return rgList;
        }

        public async Task<IEnumerable<Subscription>> GetSubscriptions()
        {
            ISubscriptionClient subClient = new SubscriptionClient(_sdkCreds);

            IPage<Subscription> subs =  await subClient.Subscriptions.ListAsync();

            return subs;

            // var enumerator = page.GetEnumerator();

            // var subs = new List<Subscription>();

            // while(enumerator.MoveNext())
            // {
            //     subs.Add(enumerator.Current);
            // }

            //return ObjectMapper.Mapper.Map<IEnumerable<AzSubscription>>(subs);
        }

        public async Task<IEnumerable<Location>> GetLocations()
        {
            return null;
        }

        private AzSDKCredentials _sdkCreds;
    }
}
