using System.Threading.Tasks;
using AzW.Model;
using AzW.Secret;

namespace AzW.Infrastructure.Data
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(WorkbenchSecret secret)
        {
            _secret = secret;
        }

        public async Task LogUserSignin(UserSigninInfo info)
        {
            var db = CosmosDbHelper.GetDatabase(_secret);

            var collection = db.GetCollection<UserSigninInfo>(CollectionName.UserSigninLog);

            await collection.InsertOneAsync(info);
        }

        private WorkbenchSecret _secret;
    }
}