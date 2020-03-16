using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

namespace AzW.Infrastructure.AzureServices
{
    public class ComputeInfoService : BaseService, IComputeInfoService
    {
        public ComputeInfoService(string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            
        }

        public async Task<IEnumerable<VMImage>> GetImageReferences(string subscription)
        {
            //https://github.com/Azure/azure-libraries-for-net/blob/master/Samples/Compute/ListVirtualMachineImages.cs

            var publishers = AzClient.WithSubscription(subscription)
                .VirtualMachineImages.Publishers.ListByRegion(Region.AsiaSouthEast);


            return null;
        }
    }
}