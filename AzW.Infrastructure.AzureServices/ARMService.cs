
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using AzW.Secret;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Rest.Azure;

namespace AzW.Infrastructure.AzureServices
{
    public class ARMService : BaseService, IARMService
    {
        public ARMService(string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {  
        }

        public async Task CreateResourceGroup(string subscription, string location, string rgName)
        {
            await AzClient.WithSubscription(subscription)
                .ResourceGroups
                .Define(rgName)
                .WithRegion(location)
                .CreateAsync();
        }

        public async Task<IEnumerable<IResourceGroup>> GetResourceGroups(string subscription)
        {
            var rgs = 
                await AzClient.WithSubscription(subscription).ResourceGroups.ListAsync();

            return rgs;
        }

        public async Task<IEnumerable<ISubscription>> GetSubscriptions()
        {
            try
            {
                var subs = 
                    await AzClient.Subscriptions.ListAsync();

                return subs;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<string> GetLocations()
        {
            var regions = new List<string>();

            var props = TypeDescriptor.GetProperties(typeof(Region));

            foreach(Region reg in Region.Values)
            {
                regions.Add(reg.Name);
            }

            return regions;
        }

        private ServiceClientOBOCredentials _sdkCreds;
    }
}
