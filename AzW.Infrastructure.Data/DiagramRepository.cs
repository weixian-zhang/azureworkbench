using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Model;
using AzW.Secret;
using MongoDB.Driver;

namespace AzW.Infrastructure.Data
{
    public class DiagramRepository : IDiagramRepository
    {
        public DiagramRepository(WorkbenchSecret secret)
        {
            _secret =secret;
        }
        
        public async Task SaveAnonymousDiagram(AnonyDiagramShareContext context)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll =
                db.GetCollection<AnonyDiagramShareContext>(CollectionName.AnonyDiagram);

            await coll.InsertOneAsync(context);
        }

        public async Task<AnonyDiagramShareContext>
            GetSharedDiagramAsync(string anonyDiagramId)
        {
            try
            {
                var db = CosmosDbHelper.GetDatabase(_secret);

                IMongoCollection<AnonyDiagramShareContext> sharedDiagrams =
                    db.GetCollection<AnonyDiagramShareContext>(CollectionName.AnonyDiagram);
                
                AnonyDiagramShareContext anonySharedDiagram =
                        await sharedDiagrams.FindSync(d => d.UID == anonyDiagramId).SingleAsync();
                
                return anonySharedDiagram;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task SaveDiagramToWorkspace(WorkspaceDiagramContext context)
        {
            try
            {
                var db = CosmosDbHelper.GetDatabase(_secret);

                var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.Workspace);

               
                var existingDiagram = coll.FindSync(x => 
                    x.CollectionName == context.CollectionName &&
                    x.DiagramName == context.DiagramName
                ).SingleOrDefault();

                if(existingDiagram == null)
                    await coll.InsertOneAsync(context);
                else
                {
                    existingDiagram.DiagramXml = context.DiagramXml;
                    existingDiagram.DateTimeSaved = DateTime.Now;

                    await coll.ReplaceOneAsync
                        (x => x.Id == existingDiagram.Id, existingDiagram);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<WorkspaceDiagramContextResult>>
            GetDiagramsFromWorkspace(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var contextResult = new List<WorkspaceDiagramContextResult>();

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.Workspace);
            var filter =
                Builders<WorkspaceDiagramContext>.Filter
                    .Eq(x => x.EmailId, emailId);
            
              using (IAsyncCursor<WorkspaceDiagramContext> cursor =
                await coll.FindAsync(x => x.EmailId == emailId))
            {
                while (await cursor.MoveNextAsync())
                {
                    IEnumerable<WorkspaceDiagramContext> batch = cursor.Current;
                    foreach (WorkspaceDiagramContext context in batch)
                    {
                       contextResult.Add(new WorkspaceDiagramContextResult()
                       {
                           EmailId = context.EmailId,
                           Id = context.Id,
                           UID = context.UID,
                           CollectionName = context.CollectionName,
                           DiagramName = context.DiagramName,
                           DateTimeSaved = context.DateTimeSaved
                       });
                    }
                }
            }
            
            return contextResult;
        }

        public async Task<IEnumerable<string>> GetCollectionFromWorkspaceAsync(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.Workspace);
            var filter =
                Builders<WorkspaceDiagramContext>.Filter.Eq(x => x.EmailId, emailId);
            
            var collectionNames = await coll.Find(filter)
                .Project(x => x.CollectionName).ToListAsync();
            
            return collectionNames;
        }

        public async Task<string> LoadDiagramFromWorkspace
            (string emailId, string collectionName, string diagramName)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.Workspace);

            var diagramContext = await coll.Find<WorkspaceDiagramContext>
                (x => x.EmailId == emailId && x.CollectionName == collectionName &
                 x.DiagramName ==  diagramName)
                .SingleOrDefaultAsync();

            return diagramContext.DiagramXml;
        }

        public async Task<bool> deleteDiagramFromWorkspace
            (string emailId, string collectionName, string UID)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.Workspace);

            var result = await coll.DeleteOneAsync<WorkspaceDiagramContext>
                (x => x.EmailId == emailId && x.CollectionName == collectionName && x.UID ==  UID);
        
            if(result.DeletedCount != 1)
            {
                //log record not found, not deleted
                return false;
            }

            return true;
        }

        private WorkbenchSecret _secret;
    }
}