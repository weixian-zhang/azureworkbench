

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
using shortid;
using shortid.Configuration;

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

        #region Shared diagram in MySpace

        [Authorize()]
        [HttpPost("wrkspace/shareddiag/save")]
        public async Task<IActionResult> SaveSharedDiagramInMySpace
            ([FromBody] SharedDiagramMySpaceContext context) 
        {
            string shortUUID = ShortId.Generate(new GenerationOptions()
            {
                Length = 20,
                UseNumbers = false,
                UseSpecialCharacters = false
            });
            
            string shareLink =
                QueryHelpers.AddQueryString(_secret.PortalUrl, "id", shortUUID);
            
            context.EmailId = this.GetUserIdentity().Email;
            context.UID = shortUUID;
            context.SharedLink = shareLink;

            var result = await _diagramRepo.SaveSharedDiagramInMySpace(context);

            result.SharedLink = shareLink;

            return StatusCode(200, result);
        }

        [Authorize()]
        [HttpGet("wrkspace/shareddiag/load")]
        public async Task<ContentResult> LoadSharedDiagramFromMySpace(string diagramUID)
        {
            string json =
                await _diagramRepo.LoadSharedDiagramFromMySpace(diagramUID);
           
           return this.Content(json, "application/json");
        }


        [Authorize()]
        [HttpGet("wrkspace/shareddiags")]
        public async Task<IEnumerable<SharedDiagramMySpaceInfo>> GetAllSharedDiagramsFromMySpace(string emailId)
        {
            try
            {
                var diagrams = await _diagramRepo.GetAllSharedDiagramsFromMySpace(emailId);
                return diagrams;
            }
            catch(Exception ex)
            {
                _logger.Error($"{ex.ToString()}");
                throw ex;
            }
        }

        [Authorize()]
        [HttpPost("wrkspace/shareddiag/update")]
        public async Task<IActionResult> UpdateSharedDiagramInMySpace
            ([FromBody] SharedDiagramMySpaceUpdateContext context)
        {
           var result =
             await _diagramRepo.UpdateSharedDiagramInMySpace(context.EmailId, context.DiagramUID, context.DiagramJson);
            
            return StatusCode(200, result);
        }

        [Authorize()]
        [HttpDelete("wrkspace/shareddiag/del")]
        public async Task<IActionResult> DeleteSharedDiagramFromMySpace(string emailId, string diagramUID)
        {
            bool result = await _diagramRepo.DeleteSharedDiagramInMySpace(emailId, diagramUID);

            if(result == true)
                return StatusCode(200, result);
            else
                return StatusCode(500, result);
        }

        #endregion

        #region Anonymous diagram

        [HttpPost("dia/anony/share")]
        public async Task<IActionResult> GenerateDiagramLink([FromBody]AnonyDiagramShareContext context)
        {            
            string shortUUID = ShortId.Generate(new GenerationOptions()
            {
                Length = 20,
                UseNumbers = false,
                UseSpecialCharacters = false
            });
            
            string shareLink =
                QueryHelpers.AddQueryString(_secret.PortalUrl, "id", shortUUID);
            
            context.UID = shortUUID;
            context.SharedLink = shareLink;
            
            var result = await _diagramRepo.SaveAnonymousDiagram(context);

            result.SharedLink = shareLink;

            return StatusCode(200, result);
        }

        [HttpGet("dia/anony/shareload")]
        public async Task<string> GetAnonymousDiagram([FromQuery]string anonyDiagramId)
        {
            var anonyDiagram =
                await _diagramRepo.GetAnonymousDiagramAsync(anonyDiagramId);
            
            return JsonConvert.SerializeObject(anonyDiagram);
        }

        #endregion

        [Authorize()]
        [HttpPost("wrkspace/dia/save")]
        public async Task<IActionResult> SaveDiagramToWorkspace([FromBody]WorkspaceDiagramContext diagramContext)
        {
            var result = await _diagramRepo.SaveDiagramToWorkspace(diagramContext);

            return StatusCode(200, result);
        }   

        [Authorize()]
        [HttpGet("wrkspace/diagrams")]
        public async Task<IEnumerable<WorkspaceDiagramContextResult>> GetDiagramsFromWorkspace(string emailId)
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
        public async Task<bool> deleteDiagramFromWorkspace(string emailId, string collectionName, string diagramName)
        {
            return await _diagramRepo.deleteDiagramFromWorkspace(emailId, collectionName, diagramName);;
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