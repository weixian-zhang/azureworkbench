

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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using iTextSharp.text;
using iTextSharp.text.pdf;

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
            (IDiagramRepository repo, WorkbenchSecret secret, Logger logger)
        {
            _diagramRepo = repo;
            _secret = secret;
            _logger = logger;
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
        public async Task<ContentResult> LoadDiagramFromWorkspace(string emailId, string collectionName, string diagramName)
        {
           string json =
            await _diagramRepo.LoadDiagramFromWorkspace(emailId, collectionName, diagramName);
           
           return this.Content(json, "application/json");
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
                
                string pureBase64 = svgbase64.Replace("data:image/png;base64,", "");
                var byteArray = Convert.FromBase64String(pureBase64);

                string utfString = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);

                using(var ms = new MemoryStream()) {
                    using (Document pdfDoc = new Document(iTextSharp.text.PageSize.A3.Rotate()))
                    {
                        pdfDoc.SetMargins(5, 5, 5, 5);
                        //pdfDoc.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());

                        // step 2
                        PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, ms);
        
                        //open the stream 
                        pdfDoc.Open();

                        iTextSharp.text.Image img = iTextSharp.text.Image.GetInstance(byteArray);
    
                        img.Alignment = iTextSharp.text.Image.ALIGN_CENTER;
                        img.Border = iTextSharp.text.Rectangle.NO_BORDER;
                        img.BorderColor = iTextSharp.text.BaseColor.WHITE;
                        img.ScaleToFit(PageSize.A3.Rotate());
                    
                        pdfDoc.Add(img);
        
                        pdfDoc.Close();
                    }

                     return new FileContentResult(ms.ToArray(), "application/octet-stream");
                }
            }              
            catch (Exception ex)
            {
                _logger.Error(ex, ex.Message);

                throw ex;
            }
        }
        
        private IDiagramRepository _diagramRepo;
        private WorkbenchSecret _secret;
        private Logger _logger;
    }

    public class ExportPngParam
    {
        public string DiagramSvg { get; set; }
        public int Width { get; set; }
         public int Height { get; set; }
    }
}