

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using AzW.Infrastructure.Data;
using AzW.Model;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using Syncfusion.HtmlConverter;
using Syncfusion.Pdf;

using Svg;
using AzW.Secret;
using System.Text.RegularExpressions;
using Serilog.Core;
using Microsoft.AspNetCore.WebUtilities;

namespace AzW.Web.API
{
    [Route("api")]
    public class DiagramController : BaseController
    {
        public DiagramController
            (IDiagramRepository repo,
             WorkbenchSecret secret, Logger logger, SynchronizedConverter html2pdfConverter)
        {
            _diagramRepo = repo;
            _secret = secret;
            _logger = logger;
            _html2pdfConverter = html2pdfConverter;
        }

        [HttpGet("dia/qs")]
        public async Task<QuickstartDiagramContext> GetQuickstartDiagram
            (string category, string name)
        {
            var diagContext =
                await _diagramRepo.GetQuickstartDiagramContext(category, name);
            
            return diagContext;
        }

        [HttpPost("dia/anony/share")]
        public async Task<string> GenerateDiagramLink([FromBody]AnonyDiagramShareContext context)
        {            
             string shortUUID = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            
            string shareLink =
                QueryHelpers.AddQueryString(_secret.PortalUrl, "id", shortUUID);
            
            context.UID = shortUUID;
            context.SharedLink = shareLink; 
            
            await _diagramRepo.SaveAnonymousDiagram(context);

            return shareLink;

        }

        [HttpGet("dia/anony/shareload")]
        public async Task<string> GetSharedDiagram([FromQuery]string anonyDiagramId)
        {
            var anonyDiagram =
                await _diagramRepo.GetSharedDiagramAsync(anonyDiagramId);
            
            return JsonConvert.SerializeObject(anonyDiagram);
        }

        [Authorize()]
        [HttpPost("wrkspace/dia/save")]
        public void SaveDiagramToWorkspace([FromBody]WorkspaceDiagramContext diagramContext)
        {
            diagramContext.EmailId = this.GetUserIdentity().Email;
            diagramContext.DateTimeSaved = DateTime.Now;

            _diagramRepo.SaveDiagramToWorkspace(diagramContext);

        }   

        [Authorize()]
        [HttpGet("wrkspace/diagrams")]
        public async Task<IEnumerable<WorkspaceDiagramContextResult>>
            GetDiagramsFromWorkspace(string emailId)
        {
            try
            {
                var diagramContexts = await _diagramRepo.GetDiagramsFromWorkspace(emailId);
                return diagramContexts;
            }
            catch(Exception ex)
            {
                _logger.Error($"{ex.ToString()}");
                throw ex;
            }
        }

        [Authorize()]
        [HttpGet("wrkspace/dia/load")]
        public async Task<string> LoadDiagramFromWorkspace(string emailId, string collectionName, string diagramName)
        {
           return  await _diagramRepo.LoadDiagramFromWorkspace(emailId, collectionName, diagramName);
        }

        [Authorize()]
        [HttpDelete("wrkspace/dia/del")]
        public async Task<bool> deleteDiagramFromWorkspace(string emailId, string collectionName, string uid)
        {
            return await _diagramRepo.deleteDiagramFromWorkspace(emailId, collectionName, uid);;
        }

        [Authorize()]
        [HttpGet("wrkspace/colls")]
        public async Task<IEnumerable<Collection>> GetCollectionFromWorkspace([FromQuery] string emailId)
        {
            try
            {
                var collections = await _diagramRepo.GetCollectionFromWorkspaceAsync(emailId);

                var collectionDistinct = collections.ToList().Distinct();

                var collList = new List<Collection>();

                    if(collections.Count() <= 0)
                        return collList;

                    collList.Add(new Collection(){Name = "All"});

                foreach(var coll in collectionDistinct)
                {
                    collList.Add(new Collection()
                    {
                        Name = coll
                    });
                }

                return collList;
            }
            catch(Exception ex)
            {
                _logger.Error($"{ex.ToString()}");
                throw ex;
            }
        }

        [AllowAnonymous()]
        [HttpPost("export/pdf")]
        public FileContentResult GeneratePNGFromSvg([FromBody] string svgbase64)
        {
            if(string.IsNullOrEmpty(svgbase64))
                return null;

            try
             {

                var byteArray = Convert.FromBase64String(svgbase64);

                string utfString = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);  
              
                using(var ms = new MemoryStream())
                {  
                        var htmlDoc = new HtmlToPdfDocument()
                        {
                            GlobalSettings = {
                                ColorMode = DinkToPdf.ColorMode.Color,
                                PaperSize = PaperKind.A3,
                                Orientation = Orientation.Landscape,
                            },
                            Objects = {
                                new DinkToPdf.ObjectSettings()
                                {
                                    HtmlContent = $"{utfString}"
                                }
                            }
                        };
                    
                    byte[] pdf = _html2pdfConverter.Convert(htmlDoc);

                    return new FileContentResult(pdf, "application/octet-stream");
                }

            }              
            catch (Exception ex)
            {
                _logger.Error(ex, ex.Message);

                throw ex;
            }
        }

        private readonly IConverter _pdfConverter;
        private IDiagramRepository _diagramRepo;
        private WorkbenchSecret _secret;
        private Logger _logger;
        private SynchronizedConverter _html2pdfConverter;
    }

    public class ExportPngParam
    {
        public string DiagramSvg { get; set; }
        public int Width { get; set; }
         public int Height { get; set; }
    }
}