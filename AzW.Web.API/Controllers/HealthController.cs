using Microsoft.AspNetCore.Mvc;

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
