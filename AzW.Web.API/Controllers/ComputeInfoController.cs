
using AzW.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("api/info/compute")]
    public class ComputeInfoController : Controller
    {
        public ComputeInfoController(IAzureInfoService azInfoSvc)
        {
            _azInfoSvc = azInfoSvc;
        }

        private IAzureInfoService _azInfoSvc;
    }
}
