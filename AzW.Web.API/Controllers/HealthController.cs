
using AzW.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace AzW.Web.UI.Controllers
{
    [Route("api/health")]
    public class HealthController : Controller
    {
        public HealthController()
        {
        }

        [HttpGet("alive")]
        public string Alive(){
            return "alive";
        }

    }
}
