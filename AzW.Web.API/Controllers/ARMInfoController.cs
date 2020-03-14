using AzW.Application;
using AzW.Dto;
using AzW.Infrastructure;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
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
    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [Route("api/info/arm")]
    public class ARMInfoController : BaseController
    {
        public ARMInfoController(WorkbenchSecret secret)
        {
            string accessToken = GetUserIdentity().AccessToken;

            _armService = new ARMService(accessToken, secret);
        }

        [HttpGet("subs")]
        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {   

            var subs = await _armService.GetSubscriptions();

            return null;
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

        private ARMService _armService;
    }
}
