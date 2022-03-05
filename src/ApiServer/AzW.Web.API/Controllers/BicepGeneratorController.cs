using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
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
        public async Task<IActionResult> Generate([FromBody] object diagramInfo)
        {
            string jsonDiagramInfo = diagramInfo.ToString();
            var jsonObj = JObject.Parse(jsonDiagramInfo);
            var innerContext =  jsonObj["diagramInfo"];

            var diagramContext = JsonConvert.DeserializeObject<DiagramInfo>(innerContext.ToString());

            string bicepBlobUrl = await _templateGenerator.Generate(diagramContext);
            
            return Ok(bicepBlobUrl);
        }

        private ITemplateGenerator _templateGenerator;

    }
}