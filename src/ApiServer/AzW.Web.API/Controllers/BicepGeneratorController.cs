using System.IO;
using System.Text;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Secret;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
    [Route("api/bicep")]
    public class BicepGeneratorController : BaseController
    {
        public BicepGeneratorController
            (ITemplateGenerator templateGenerator, IWebHostEnvironment _webenv)
        {
            _templateGenerator = templateGenerator;
        }

        [HttpPost("gen")]
        public FileContentResult Generate([FromBody] ProvisionParameters parameters)
        {
            string bicep = _templateGenerator.Generate(parameters.ProvisionContexts);

            byte[] bytes = Encoding.ASCII.GetBytes(bicep);

             return new FileContentResult(bytes, "application/octet-stream");
        }

        private ITemplateGenerator _templateGenerator;

    }
}