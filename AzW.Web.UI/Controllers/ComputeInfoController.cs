using AzW.Application;
using AzW.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("compute")]
    public class ComputeInfoController : Controller
    {
        public ComputeInfoController(IComputeInfoService computeInfoService)
        {
            _computeInfoService = computeInfoService;
        }

        

        private IComputeInfoService _computeInfoService;
    }
}
