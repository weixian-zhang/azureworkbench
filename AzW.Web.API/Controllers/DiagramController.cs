

using System.Threading.Tasks;
using AzW.Application;
using AzW.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AzW.Web.API
{
    
    [Route("api")]
    public class DiagramController : BaseController
    {
        public DiagramController(IDiagramLogic diagramLogic)
        {
            _diagramLogic = diagramLogic;
        }

        [HttpPost("dia/anony/share")]
        public async Task<string> GenerateDiagramLink([FromBody]AnonyDiagramShareContext context)
        {
            string shareLink =
                await _diagramLogic.GenerateShareLinkForAnonyDiagramAsync(context);
            
            return shareLink;

        }

        [HttpGet("dia/anony/shareload")]
        public async Task<string> GetSharedDiagram([FromQuery]string anonyDiagramId)
        {
            var anonyDiagram =
                await _diagramLogic.GetSharedDiagramAsync(anonyDiagramId);
            
            return JsonConvert.SerializeObject(anonyDiagram);
        }

        [Authorize()]
        [HttpPost("dia/save")]
        public void SaveDiagram()
        {

        }

        private IDiagramLogic _diagramLogic;
    }
}