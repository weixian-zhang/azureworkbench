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
        public DiagramRepository(WorkbenchSecret secret, BlobStorageManager blobStorageManager)
        {
            _secret =secret;
            _blob = blobStorageManager;
        }
        
        public async Task<DiagramSaveResult> SaveAnonymousDiagram(AnonyDiagramShareContext context)
        {
            try
            {
                var db = CosmosDbHelper.GetDatabase(_secret);

                var coll =
                    db.GetCollection<AnonyDiagramShareContext>(CollectionName.AnonyDiagram);
                
                //diagram now stores in blob storage
                await _blob.SaveSharedLinkDiagram(context.UID, context.DiagramXml);
                context.DiagramXml = string.Empty;

                await coll.InsertOneAsync(context);

                return new DiagramSaveResult() { IsSuccess = true };
            }
            catch(MongoWriteException mwex)
            {
                if(mwex.Message.ToLowerInvariant().Contains("request size is too large"))
                    return new DiagramSaveResult()
                    {
                        IsSuccess = false,
                        ErrorCode = "diagram-to-large"
                    };
                throw mwex;
            }
            catch(MongoCommandException mex)
            {
                if(mex.Message.ToLowerInvariant().Contains("request size is too large"))
                    return new DiagramSaveResult()
                    {
                        IsSuccess = false,
                        ErrorCode = "diagram-to-large"
                    };
                throw mex;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AnonyDiagramShareContext>GetSharedDiagramAsync(string anonyDiagramId)
        {
            try
            {
                 string diagram = await _blob.GetSharedLinkDiagram(anonyDiagramId);
                
                return new AnonyDiagramShareContext() {DiagramXml = diagram};
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DiagramSaveResult> SaveDiagramToWorkspace(WorkspaceDiagramContext context)
        {
            try
            {
                string newCollName =
                    context.CollectionName.TrimStart().TrimEnd().Replace(" ", "").Replace("/", "-");
                context.CollectionName = newCollName;
                string newDiagramName =
                    context.DiagramName.TrimStart().TrimEnd().Replace(" ", "").Replace("/", "-");
                context.DiagramName = newDiagramName;

                var db = CosmosDbHelper.GetDatabase(_secret);

                var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.MySpace);
               
                var existingDiagram = coll.FindSync(x => 
                    x.EmailId == context.EmailId &&
                    x.CollectionName == context.CollectionName &&
                    x.DiagramName == context.DiagramName
                ).SingleOrDefault();

                if(existingDiagram == null)
                {
                    //save diagram to blob
                    await _blob.SaveDiagramToMySpace
                        (context.DiagramXml,context.EmailId,context.CollectionName,context.DiagramName);
                    
                    context.DiagramXml = string.Empty; //dont save to cosmos anymore
                    context.DateTimeSaved = DateTime.Now;

                    await coll.InsertOneAsync(context);
                }
                else
                {
                    //save diagram to blob
                    await _blob.SaveDiagramToMySpace
                        (context.DiagramXml,context.EmailId,context.CollectionName,context.DiagramName);
                    context.DiagramXml = string.Empty; //dont save to cosmos anymore

                    existingDiagram.DateTimeSaved = DateTime.Now;

                    await coll.ReplaceOneAsync
                        (x => x.Id == existingDiagram.Id && x.EmailId == existingDiagram.EmailId, existingDiagram);
                }
                return new DiagramSaveResult() { IsSuccess = true };
            }
            catch(MongoWriteException mwex)
            {
                if(mwex.Message.ToLowerInvariant().Contains("request size is too large"))
                    return new DiagramSaveResult()
                    {
                        IsSuccess = false,
                        ErrorCode = "diagram-to-large"
                    };
                throw mwex;
            }
            catch(MongoCommandException mex)
            {
                if(mex.Message.ToLowerInvariant().Contains("request size is too large"))
                    return new DiagramSaveResult()
                    {
                        IsSuccess = false,
                        ErrorCode = "diagram-to-large"
                    };
                throw mex;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<WorkspaceDiagramContextResult>>GetDiagramsFromWorkspace(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var contextResult = new List<WorkspaceDiagramContextResult>();

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.MySpace);
            
              using (IAsyncCursor<WorkspaceDiagramContext> cursor =
                await coll.FindAsync(x => x.EmailId == emailId))
            {
                while (await cursor.MoveNextAsync())
                {
                    IEnumerable<WorkspaceDiagramContext> batch = cursor.Current;
                    foreach (WorkspaceDiagramContext context in batch)
                    {
                       double size =
                        await _blob.GetBlobSizeInMB(context.EmailId, context.CollectionName, context.DiagramName);
                       contextResult.Add(new WorkspaceDiagramContextResult()
                       {
                           EmailId = context.EmailId,
                           Id = context.Id,
                           UID = context.UID,
                           CollectionName = context.CollectionName,
                           DiagramName = context.DiagramName,
                           DateTimeSaved = context.DateTimeSaved,
                           SizeInMB = size
                           
                       });
                    }
                }
            }
            
            return contextResult;
        }

        public async Task<IEnumerable<string>> GetCollectionFromWorkspaceAsync(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.MySpace);
            var filter =
                Builders<WorkspaceDiagramContext>.Filter.Eq(x => x.EmailId, emailId);
            
            var collectionNames = await coll.Find(filter)
                .Project(x => x.CollectionName).ToListAsync();
            
            return collectionNames;
        }

        
        public async Task<string> LoadDiagramFromWorkspace
            (string emailId, string collectionName, string diagramName)
        {
            string diagram =
                await _blob.GetDiagramFromMySpace(emailId, collectionName, diagramName);
            
            return diagram;
        }

        public async Task<bool> deleteDiagramFromWorkspace
            (string emailId, string collectionName, string diagramName)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<WorkspaceDiagramContext>(CollectionName.MySpace);

            bool blobDel = await _blob.DeleteDiagramFromMySpace(emailId, collectionName, diagramName);

            if(blobDel)
            {
                var result = await coll.DeleteOneAsync<WorkspaceDiagramContext>
                    (x => x.EmailId == emailId && x.CollectionName == collectionName && x.DiagramName ==  diagramName);
            
                if(result.DeletedCount != 1)
                {
                    //log record not found, not deleted
                    return false;
                }
            }
            
            return true;
        }

        public async Task<QuickstartDiagramContext> GetQuickstartDiagramContext(string category, string name)
        {
            string diagramJson = await _blob.GetQuickstartDiagram(category, name);

            return new QuickstartDiagramContext()
            {
                DiagramXml = diagramJson
            };
            // var db = CosmosDbHelper.GetDatabase(_secret);

            // var coll = db.GetCollection<QuickstartDiagramContext>(CollectionName.Quickstart);

            // var qsDiagram = await coll.FindSync<QuickstartDiagramContext>
            //     (x => x.Category == category && x.Name == name).SingleOrDefaultAsync();
            
            // return qsDiagram;
        }

        private WorkbenchSecret _secret;
        private BlobStorageManager _blob;
    }
}