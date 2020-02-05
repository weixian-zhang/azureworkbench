

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Application;
using AzW.Infrastructure.Data;
using AzW.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AzW.Web.API
{
    [EnableCors("ApiCorsPolicy")]
    [Route("api")]
    public class DiagramController : BaseController
    {
        public DiagramController(IDiagramLogic diagramLogic, IDiagramRepository repo)
        {
            _diagramLogic = diagramLogic;
            _diagramRepo = repo;
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
          var diagramContexts = await _diagramRepo.GetDiagramsFromWorkspace(emailId);
          return diagramContexts;
        }

        [Authorize()]
        [HttpGet("wrkspace/dia/load")]
        public async Task<string> LoadDiagramFromWorkspace(string emailId, string collectionName, string uid)
        {
           return  await _diagramRepo.LoadDiagramFromWorkspace(emailId, collectionName, uid);
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
           var collections = await _diagramRepo.GetCollectionFromWorkspaceAsync(emailId);

           var collectionsWithAllOption = collections.ToList();

           var collList = new List<Collection>();

            if(collections.Count() <= 0)
                return collList;

            collList.Add(new Collection(){Name = "All"});

           foreach(var coll in collections)
           {
               collList.Add(new Collection()
               {
                   Name = coll
               });
           }

           return collList;
        }

        private IDiagramLogic _diagramLogic;
        private IDiagramRepository _diagramRepo;
    }
}