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
    //ARM APIs get subscriptions, Resource Groups and other information based on
    //users' RBAC
    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [Route("api/arm")]
    public class ARMInfoController : BaseController
    {
        public ARMInfoController(ApiSecret secret)
        {
            _secret = secret;
        }

        [HttpGet("sub")]
        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {   
            var rmsvc = new ResourceManagerLogic(
                new ResourceManagerService(
                    new AzSDKCredentials(GetUserIdentity().AccessToken,
                    _secret.TenantId, _secret.ClientId, _secret.ClientSecret)));

            var subscriptions = await rmsvc.GetSubscriptions();

            return subscriptions;
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


        private ApiSecret _secret;
    }
}
