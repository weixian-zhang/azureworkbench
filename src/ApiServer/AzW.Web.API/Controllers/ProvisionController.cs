// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using AzW.Infrastructure.AzureServices;
// using AzW.Model;
// using AzW.Secret;
// using Microsoft.AspNetCore.Authentication;
// using Microsoft.AspNetCore.Authentication.AzureAD.UI;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Newtonsoft.Json.Linq;

// namespace AzW.Web.API
// {
//     [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
//     [Route("api")]
//     public class ProvisionController : BaseController
//     {
//         public ProvisionController(WorkbenchSecret secret) //, IWebHostEnvironment env)
//         {
//             //_hostenv = env;
//             _secret = secret;
//         }

//         [HttpPost("deploy")]
//         public async Task<ProvisionResult> Provision([FromBody] ProvisionParameters parameters)
//         {
//             string accessToken = GetUserIdentity().AccessToken;
//             _secret.AccessToken = accessToken;
//             _secret.UserUPN = GetUserIdentity().Email;

//             IProvisionService provisionSvc =
//                 new ProvisionService(parameters.SubscriptionId, _secret);

//             return await provisionSvc.ProvisionAsync(parameters.ProvisionContexts);
//         }

//         private IWebHostEnvironment _hostenv;
//         private WorkbenchSecret _secret;
//     }
// }
