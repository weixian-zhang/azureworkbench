
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
    public class InfoController : BaseController
    {
        public InfoController(ICacheRepository cache, WorkbenchSecret secret)
        {
            _cache = cache;
            _secret = secret;
        }

        [HttpGet("image/publishers")]
        public async Task<IEnumerable<VMImagePublisher>> GetVMImagePublisherAsync(string publisher)
        {
           var pubs = await _cache.GetAllVMImagePublishersAsync();

           return pubs;
        }

        [HttpGet("images")]
        public async Task<IEnumerable<VMImage>> GetVMImageOfferSkuAsync(string publisher)
        {
           var vmImages = await _cache.GetVMImageOfferSkuAsync(publisher);

           return vmImages;
        }

      //   [HttpGet("vm/images")]
      //   public async Task<IEnumerable<VMImage>> GetAllVMImages()
      //   {
      //      var vmImages = await _cache.GetAllVMImagesAsync();

      //      return vmImages;
      //   }

        [HttpGet("vmsize")]
        public async Task<IEnumerable<VMSize>> SearchVMSizes()
        {
           var sizes = await _cache.GetVMSizeAsync();

           return sizes;
        }

        [HttpGet("svctag")]
        public async Task<IEnumerable<ServiceTag>> GetServiceTags()
        {
           var svctags = await _cache.GetServiceTagAsync();

           return svctags;
        }

        private ICacheRepository _cache;
        private WorkbenchSecret _secret;
    }
}
