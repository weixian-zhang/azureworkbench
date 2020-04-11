
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

        [HttpGet("vmsize")]
        public async Task<IEnumerable<VMSize>> SearchVMSizes()
        {
           var sizes = await _cache.GetVMSizeAsync();

           return sizes;
        }

        private ICacheRepository _cache;
        private WorkbenchSecret _secret;
    }
}
