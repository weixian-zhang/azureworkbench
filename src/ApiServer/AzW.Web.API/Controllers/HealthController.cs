using System;
using AzW.Secret;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.UI.Controllers
{
    public class HealthController : Controller
    {
        public HealthController()
        {
        }

        [HttpGet("health")]
        public string Alive()
        {
            return "alive";
        }
    }
}
