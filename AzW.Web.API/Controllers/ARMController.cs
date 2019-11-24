using AzW.Application;
using AzW.Dto;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace AzW.Web.API
{
    //ARM APIs get subscriptions, Resource Groups and other information based on
    //users' RBAC
    [Authorize]
    [Route("api/arm")]
    public class ArmController : BaseController
    {
        public ArmController(WorkbenchSecret secrets) : base(secrets)
        {
          
        }

        [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
        [HttpGet("sub")]
        public JsonResult GetSubscriptions()
        {
            //var subscriptions = _azsvc.ArmService.GetSubscriptions();

            return null; //new JsonResult(subscriptions);
        }

        [Authorize]
        [HttpGet("rg")]
        public JsonResult GetSResourceGroups()
        {
            //var resourceGroups = _azsvc.ArmService.GetResourceGroups();

            return new JsonResult(null);
        }

        [Route("loc")]
        public IEnumerable<string> GetLocations()
        {
            return null;
            //return _armService.GetRegions();
        }

        private IHttpContextAccessor _httpcontext;

        private IAzService _azsvc;
    }
}
