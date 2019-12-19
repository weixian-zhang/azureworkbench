

using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.API
{
    
    [Route("api/fiddler")]
    public class DiagramController : BaseController
    {
        [HttpGet("gendiagramlink")]
        public string GenerateDiagramLink()
        {
            return "https://azureworkench.com?dia=311dssfsefseg2234";
        }

        [HttpGet("loaddiagram")]
        public string LoadDiagramLink(string linkUrl)
        {
            return "{'nodes': ['resourceType': '']}";
        }

        public void SaveDiagram() //diagram object
        {

        }
    }
}