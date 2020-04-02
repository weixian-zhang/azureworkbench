using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [Route("api")]
    public class ProvisionController : BaseController
    {
        public ProvisionController(WorkbenchSecret secret)
        {
            _secret = secret;
        }

        [HttpPost("deploy")]
        public async Task Provision
            ([FromBody] AzSubscription subscription, [FromBody]JArray resourceIcons)
        {
            string accessToken = GetUserIdentity().AccessToken;

            IProvisionService provisionSvc = new ProvisionService(subscription, accessToken, _secret);

            await provisionSvc.ProvisionAsync(resourceIcons);
        }

        private WorkbenchSecret _secret;
    }
}
