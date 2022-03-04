using System.IO;
using System.Text;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Secret;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using AzW.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public async Task<ActionResult> Generate([FromBody] object diagramInfo)
        {
            string jsonDiagramInfo = diagramInfo.ToString();
            var jsonObj = JObject.Parse(jsonDiagramInfo);
            var innerContext =  jsonObj["diagramInfo"];

            var diagramContext = JsonConvert.DeserializeObject<DiagramInfo>(innerContext.ToString());

            string bicepBlobUrl = await _templateGenerator.Generate(diagramContext);

            Response.Headers.Add("bicep-blob-url", bicepBlobUrl);

            return Ok();

            // byte[] bytes = Encoding.ASCII.GetBytes(string.Empty);

            //  return new FileContentResult(bytes, "application/octet-stream");
        }

        // [HttpPost("gen")]
        // public FileContentResult Generate([FromBody] ProvisionParameters parameters)
        // {
        //     string bicep = _templateGenerator.Generate(parameters.ProvisionContexts);

        //     byte[] bytes = Encoding.ASCII.GetBytes(bicep);

        //      return new FileContentResult(bytes, "application/octet-stream");
        // }

        private ITemplateGenerator _templateGenerator;

    }
}