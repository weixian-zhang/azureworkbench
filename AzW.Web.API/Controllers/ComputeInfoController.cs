
using AzW.Infrastructure.AzureServices;
using AzW.Infrastructure.Data;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Management.Compute.Fluent;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
    [Route("api/compute")]
    public class ComputeInfoController : BaseController
    {
        public ComputeInfoController(ICacheRepository cache, WorkbenchSecret secret)
        {
            _cache = cache;
            _secret = secret;
        }

        [HttpGet("search/images")]
        public async Task<IEnumerable<VMImage>> SearchVMImages(string searchPattern)
        {
           var vmImages = await _cache.SearchVMImagesAsync(searchPattern);

           return vmImages;
        }

        [HttpGet("size")]
        public async Task<IEnumerable<VMSize>> SearchVMSizes(string location, string subscription)
        {
           string accessToken = GetUserIdentity().AccessToken;

           IComputeInfoService computeInfoService=
                new ComputeInfoService(accessToken, _secret);

           var vmSizes =
            await computeInfoService.GetVMSizes(location, subscription);
        
            var vmSizeList = new List<VMSize>();

            foreach(var size in vmSizes)
            {
                vmSizeList.Add(new VMSize() 
                {
                    Name = size.Name,
                    MemoryInMB = size.MemoryInMB,
                    NumberOfCores =  size.NumberOfCores,
                    MaxNoOfDataDisks = size.MaxDataDiskCount
                });
            }

           return vmSizeList;
        }

        private ICacheRepository _cache;
        private WorkbenchSecret _secret;
    }
}
