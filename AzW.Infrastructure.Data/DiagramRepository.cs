using System;
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

        private WorkbenchSecret _secret;
    }
}