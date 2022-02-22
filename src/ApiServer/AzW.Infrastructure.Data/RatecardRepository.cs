using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;
using AzW.Secret;
using MongoDB.Bson;

namespace AzW.Infrastructure.Data
{
    public class RatecardRepository : IRatecardRepository
    {
        public RatecardRepository(WorkbenchSecret secret)
        {
            _secret =secret;
        }

        public async Task InsertRatecardsAsync(IEnumerable<Ratecard> ratecards)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<Ratecard>(CollectionName.Ratecard);

            await coll.InsertManyAsync(ratecards);
        }

        public async Task<bool> IsRatecardExist()
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var coll = db.GetCollection<Ratecard>(CollectionName.Ratecard);

            var result = await coll.EstimatedDocumentCountAsync();

            if(result > 0)
                return true;
            else
                return false;
        }

        private WorkbenchSecret _secret;
    }
}