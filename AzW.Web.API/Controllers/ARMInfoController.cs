using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Management.ResourceManager.Fluent;
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
           _secret = secret;
        }

        [HttpGet("subs")]
        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {   

            var subs = await _armService.GetSubscriptions();

            var azSubs = ObjectMapper.Mapper
                .Map<IEnumerable<ISubscription>, IEnumerable<AzSubscription>>(subs);


            return azSubs;
        }

        [Authorize]
        [HttpGet("rg")]
        public async Task<IEnumerable<AzResourceGroup>> GetResourceGroups(string subscription)
        {
            string accessToken = GetUserIdentity().AccessToken;

            _armService = new ARMService(accessToken, _secret);

            var irgs = await _armService.GetResourceGroups(subscription);

            var azRGs = ObjectMapper.Mapper
                .Map<IEnumerable<IResourceGroup>, IEnumerable<AzResourceGroup>>(irgs);

            return azRGs;
        }

        [Authorize]
        [HttpGet("loc")]
        public IEnumerable<string> GetLocations()
        {
            string accessToken = GetUserIdentity().AccessToken;

            _armService = new ARMService(accessToken, _secret);

            return _armService.GetLocations();
        }

        private ARMService _armService;
        private WorkbenchSecret _secret;
    }
}
