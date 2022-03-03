using System;
using AzW.Secret;
using Microsoft.AspNetCore.Mvc;
using Serilog.Core;

namespace AzW.Web.UI.Controllers
{
    public class HealthController : Controller
    {
        public HealthController(WorkbenchSecret secret, Logger logger)
        {
        }

        [HttpGet("healthz")]
        public string Alive()
        {
            return "alive";
        }
    }
}
