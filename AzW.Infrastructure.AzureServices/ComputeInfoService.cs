using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
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
    }
}