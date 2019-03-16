using AzW.Application;
using AzW.Model;
using AzW.Model.Designer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("arm")]
    public class ARMController : Controller
    {
        public ARMController(IARMService armService)
        {
            //_httpcontext = httpContext;
            _armService = armService;
        }

        [Authorize]
        [HttpGet("scrp")]
        public JsonResult GetSubscriptions()
        {
            var subscriptions = _armService.GetSubscriptions();

            return new JsonResult(subscriptions);
        }

        [Authorize]
        [HttpGet("rg")]
        public JsonResult GetSResourceGroups()
        {
            var resourceGroups = _armService.GetResourceGroups();

            return new JsonResult(resourceGroups);
        }

        [Route("loc")]
        public IEnumerable<string> GetLocations()
        {
            return _armService.GetRegions();
        }

        [Route("vmimgs")]
        public async Task<IEnumerable<VMImage>> GetVMImages(string region)
        {
            return await _armService.GetVMImagesAsync(region);
        }

        private IHttpContextAccessor _httpcontext;
        private IARMService _armService;
    }
}
