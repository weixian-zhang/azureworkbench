using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AzW.Model;
using Microsoft.Azure.Management;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Identity.Client;
using Microsoft.Rest.Azure;

namespace AzW.Application
{
    public class ARMService : BaseService, IARMService
    {
        public ARMService(AzSDKCredentials sdkCred)
        {  
            _sdkCred = sdkCred;
        }

        public async Task<IEnumerable<AzResourceGroup>> GetResourceGroups(string subscriptionId)
        {
            ISubscriptionClient subClient = new SubscriptionClient(_sdkCred);
            
            var rmClient = new ResourceManagementClient(_sdkCred);

            rmClient.SubscriptionId = subscriptionId;

            var rgs = await rmClient.ResourceGroups.ListAsync();

            var rgList = new List<AzResourceGroup>();

            foreach(var rg in rgs)
            {
                rgList.Add(new AzResourceGroup(){
                    Name = rg.Name,
                    Id = rg.Id,
                    Loction = rg.Location
                });
            }

            return rgList;
        }

        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {
            ISubscriptionClient subClient = new SubscriptionClient(_sdkCred);

            IPage<Subscription> page =  await subClient.Subscriptions.ListAsync();

            var enumerator = page.GetEnumerator();

            var subs = new List<Subscription>();

            while(enumerator.MoveNext())
            {
                subs.Add(enumerator.Current);
            }

            return ObjectMapper.Mapper.Map<IEnumerable<AzSubscription>>(subs);
        }

        private AzSDKCredentials _sdkCred;
        private readonly IMapper _mapper;
    }
}
