using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using AzW.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;

namespace AzW.Web.API
{
    [Authorize(AuthenticationSchemes = "AzureADJwtBearer")]
    [Route("api/bicep")]
    public class BicepGeneratorController : BaseController
    {
        private ILogger _logger;

        public BicepGeneratorController
            (ITemplateGenerator templateGenerator, ILogger logger)
        {
            _logger = logger;
            _templateGenerator = templateGenerator;
        }

        [HttpPost("gen")]
        public async Task<IActionResult> Generate([FromBody] object diagramInfo)
        {
            string jsonDiagramInfo = diagramInfo.ToString();
            var jsonObj = JObject.Parse(jsonDiagramInfo);
            var innerContext =  jsonObj["diagramInfo"];

            var diagramContext = JsonConvert.DeserializeObject<DiagramInfo>(innerContext.ToString());

            _logger.Information("BicepGeneratorController: Bicep template gen request receive, generating request");

            string bicepBlobUrl = await _templateGenerator.Generate(diagramContext);

            _logger.Information($"BicepGeneratorController: Bicep template command sent successfully, bicep blob Url {bicepBlobUrl}");
            
            return Ok(bicepBlobUrl);
        }

        private ITemplateGenerator _templateGenerator;

    }
}