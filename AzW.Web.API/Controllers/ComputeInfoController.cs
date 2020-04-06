
using AzW.Infrastructure.AzureServices;
using AzW.Infrastructure.Data;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
    [Route("api/compute")]
    public class ComputeInfoController : Controller
    {
        public ComputeInfoController(ICacheRepository cache) //, WorkbenchSecret secret)
        {
            _cache = cache;
        }

        [HttpGet("search/images")]
        public async Task<IEnumerable<VMImage>> SearchVMImages(string searchPattern)
        {
           var vmImages = await _cache.SearchVMImagesAsync(searchPattern);

           return vmImages;
        }

        private ICacheRepository _cache;
    }
}
