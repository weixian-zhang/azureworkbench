using AzW.Application;
using AzW.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzW.Web.UI.Controllers
{
    //ARM APIs get subscriptions, Resource Groups and other information based on
    //users' RBAC
    [Authorize]
    [Route("arm")]
    public class ARMController : Controller
    {
        public ARMController(IAzService azservice)
        {
            //_httpcontext = httpContext;
            _azsvc = azservice;
        }

        [Authorize]
        [HttpGet("scrp")]
        public JsonResult GetSubscriptions()
        {
            var subscriptions = _azsvc.ArmService.GetSubscriptions();

            return new JsonResult(subscriptions);
        }

        [Authorize]
        [HttpGet("rg")]
        public JsonResult GetSResourceGroups()
        {
            var resourceGroups = _azsvc.ArmService.GetResourceGroups();

            return new JsonResult(resourceGroups);
        }

        [Route("loc")]
        public IEnumerable<string> GetLocations()
        {
            return null;
            //return _armService.GetRegions();
        }

        [Route("vmimgs")]
        public async Task<IEnumerable<VMImage>> GetVMImages(string region)
        {
            return null;
            //return await _armService.GetVMImagesAsync(region);
        }

        private IHttpContextAccessor _httpcontext;

        private IAzService _azsvc;
    }
}
