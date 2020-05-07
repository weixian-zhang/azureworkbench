using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net.Http;
using System.Threading.Tasks;


namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
    [Route("api")]
    public class ARMInfoController : BaseController
    {
        private const string AuthSchemes =
            AzureADDefaults.BearerAuthenticationScheme + "," +
            AzureADDefaults.JwtBearerAuthenticationScheme;

        public ARMInfoController(WorkbenchSecret secret)
        {
           _secret = secret;
        }

        
        [HttpGet("arm/subs")]
        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {   
            string accessToken = GetUserIdentity().AccessToken;
            _secret.AccessToken = accessToken;
            _secret.UserUPN =  GetUserIdentity().Email;

            _armService = new ARMService(_secret);

            var subs = await _armService.GetSubscriptions();

            var azSubs = ObjectMapper.Mapper
                .Map<IEnumerable<ISubscription>, IEnumerable<AzSubscription>>(subs);


            return azSubs;
        }

        [HttpPost("arm/rg/new")]
        public async Task CreateResourceGroup([FromBody] NewRGParameter parameters)
        {
            string accessToken = GetUserIdentity().AccessToken;
            _secret.AccessToken = accessToken;
            _secret.UserUPN =  GetUserIdentity().Email;

            _armService = new ARMService(_secret);

            await _armService.CreateResourceGroup
                (parameters.SubscriptionId, parameters.Location, parameters.RGName);
        }

        [HttpGet("arm/rg")]
        public async Task<IEnumerable<AzResourceGroup>> GetResourceGroups(string subscription)
        {
            string accessToken = GetUserIdentity().AccessToken;
            _secret.AccessToken = accessToken;
            _secret.UserUPN =  GetUserIdentity().Email;

            _armService = new ARMService(_secret);

            var irgs = await _armService.GetResourceGroups(subscription);

            var azRGs = ObjectMapper.Mapper
                .Map<IEnumerable<IResourceGroup>, IEnumerable<AzResourceGroup>>(irgs);

            return azRGs;
        }

        [AllowAnonymous]
        [HttpGet("arms/loc")]
        public IEnumerable<RegionMap> GetLocations()
        {
            return RegionMapList.List();
        }

        private ARMService _armService;
        private WorkbenchSecret _secret;
    }
}
