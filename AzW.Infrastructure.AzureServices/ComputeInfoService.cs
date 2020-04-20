using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Network.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

namespace AzW.Infrastructure.AzureServices
{
    public class ComputeInfoService : BaseService, IComputeInfoService
    {
        public ComputeInfoService(string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            
        }

        public async Task<IEnumerable<IVirtualMachineSize>> GetVMSizes(string location, string subscription)
        {
            var vmSizes = new List<string>();

            var sizes = await AzClient.WithSubscription(subscription)
                .VirtualMachines.Sizes.ListByRegionAsync(location);
            
            return sizes;
        }

        // public async Task GetServiceTags(string location)
        // {
        //     var restClient = RestClient.Configure()
        //         .WithEnvironment(AzureEnvironment.AzureGlobalCloud)
        //         .WithCredentials(AzureCreds)
        //         .Build();

        //     using (var client = new NetworkManagementClient(restClient))
        //     {
        //         var tags = await client.ServiceTags.ListAsync(location);

        //         foreach(var svcTagInfo in tags.Values)
        //         {
        //             svcTagInfo.Properties.
        //         }
        //     }

        // }
    }
}