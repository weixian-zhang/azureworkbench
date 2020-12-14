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

        #region Anonymous diagram

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

        public async Task<AnonyDiagramShareContext>
            GetAnonymousDiagramAsync(string anonyDiagramId)
        {
            try
            {
                string diagram = "";

                var db = CosmosDbHelper.GetDatabase(_secret);

                var coll =
                    db.GetCollection<SharedDiagramMySpaceInfo>(CollectionName.MySpaceSharedDiagram);
                
                 var sharedDiagram =
                        (await coll.FindAsync(x => x.UID == anonyDiagramId)).SingleOrDefault();
                    
                if(sharedDiagram != null)
                    diagram = await _blob.GetSharedDiagramFromMySpace(anonyDiagramId);
                else
                    diagram = await _blob.GetSharedLinkDiagram(anonyDiagramId);
                               
                return new AnonyDiagramShareContext() {DiagramXml = diagram};
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Shared diagram in MySpace

        public async Task<IEnumerable<SharedDiagramMySpaceInfo>> GetSharedDiagramMySpaceInfo(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var infoList = new List<SharedDiagramMySpaceInfo>();

            var coll =
                db.GetCollection<SharedDiagramMySpaceInfo>(CollectionName.MySpaceSharedDiagram);
        
            using (IAsyncCursor<SharedDiagramMySpaceInfo> cursor =
                await coll.FindAsync(x => x.EmailId == emailId))
            {
                while (await cursor.MoveNextAsync())
                {
                    IEnumerable<SharedDiagramMySpaceInfo> sharedDiagInfo = cursor.Current;

                    foreach (SharedDiagramMySpaceInfo sdi in sharedDiagInfo)
                    {
                        infoList.Add(sdi);
                    }
                }
            }

            return infoList;
        }

        public async Task<string> LoadSharedDiagramFromMySpace(string diagramUID)
        {
            string diagram =
                await _blob.GetSharedDiagramFromMySpace(diagramUID);
            
            return diagram;
        }

        public async Task<IEnumerable<SharedDiagramMySpaceInfo>> GetAllSharedDiagramsFromMySpace(string emailId)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<SharedDiagramMySpaceInfo>(CollectionName.MySpaceSharedDiagram);
            var filter =
                Builders<WorkspaceDiagramContext>.Filter.Eq(x => x.EmailId, emailId);
            
            var sharedDiagramsList =
                (await coll.FindAsync(x => x.EmailId == emailId)).ToList<SharedDiagramMySpaceInfo>();
            
            return sharedDiagramsList;
        }

        public async Task<DiagramSaveResult> SaveSharedDiagramInMySpace(SharedDiagramMySpaceContext context)
        {
            try
            {
                var db = CosmosDbHelper.GetDatabase(_secret);

                var coll =
                    db.GetCollection<SharedDiagramMySpaceContext>(CollectionName.MySpaceSharedDiagram);
                
                //diagram now stores in blob storage
                await _blob.SaveSharedDiagramInMySpace(context.EmailId, context.UID, context.DiagramXml);
                //don't save diagramJson to Cosmos
                context.DiagramXml = string.Empty;

                await coll.InsertOneAsync(context);

                return new DiagramSaveResult() { IsSuccess = true, SharedLink = context.SharedLink };
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

        public async Task<DiagramSaveResult> UpdateSharedDiagramInMySpace(string emailId, string diagramUID, string diagramJson)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll =
                db.GetCollection<SharedDiagramMySpaceContext>(CollectionName.MySpaceSharedDiagram);
            
            var existingSharedDiagram = coll.FindSync(x =>
                    x.EmailId == emailId &&
                    x.UID == diagramUID
                ).SingleOrDefault();
            
            if(existingSharedDiagram == null)
                throw new Exception("Existing shared diagram not found when performing DiagramRepository.UpdateSharedDiagramInMySpace");

            await _blob.SaveSharedDiagramInMySpace(emailId, diagramUID, diagramJson);

            existingSharedDiagram.DateTimeSaved = DateTime.Now;

            await coll.ReplaceOneAsync
                (x => x.Id == existingSharedDiagram.Id && x.EmailId == emailId && x.UID == diagramUID, existingSharedDiagram);

            return new DiagramSaveResult() { IsSuccess = true };
        }

        public async Task<bool> DeleteSharedDiagramInMySpace(string emailId, string diagramUID)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<SharedDiagramMySpaceInfo>(CollectionName.MySpaceSharedDiagram);

            bool blobDel = await _blob.DeleteSharedDiagramFromMySpace(emailId, diagramUID);

            if(blobDel)
            {
                var result =
                    await coll.DeleteOneAsync<SharedDiagramMySpaceInfo>(x => x.EmailId == emailId && x.UID ==  diagramUID);
            
                if(result.DeletedCount != 1)
                {
                    //log record not found, not deleted
                    return false;
                }
            }
            
            return true;
        }

        #endregion

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
        }

        private WorkbenchSecret _secret;
        private BlobStorageManager _blob;
    }
}