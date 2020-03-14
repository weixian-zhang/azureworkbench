using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;

namespace AzW.Infrastructure.AzureServices
{
    public class ComputeInfoService : BaseService, IComputeInfoService
    {
        public ComputeInfoService(string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            
        }

        public async Task<IEnumerable<VMImageReference>> GetImageReferences(string subscription)
        {
            var skus = await AzClient.WithSubscription
                (subscription).ComputeSkus.ListAsync();

            return null;
        }
    }
}