
using AzW.Application;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [Route("api/info/compute")]
    public class ComputeInfoController : BaseController
    {
        public ComputeInfoController(WorkbenchSecret secret)
        {
            _secret = secret;
        }

        [HttpGet("vmsku")]
        public Task<IEnumerable<VMImageReference>> GetVMSkus(string subscription)
        {
        string accessToken = GetUserIdentity().AccessToken;

        _computeInfoSvc = new ComputeInfoService(accessToken, _secret);

           var skus = _computeInfoSvc.GetImageReferences(subscription);

           return null;
        }

        private ComputeInfoService _computeInfoSvc;
        private WorkbenchSecret _secret;
    }
}
