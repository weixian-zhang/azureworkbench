using System;
using System.Security.Authentication;
using AzW.Model;
using AzW.Secret;
using MongoDB.Driver;

namespace AzW.Infrastructure.Data
{
    public class CosmosDbHelper
    {
        public static IMongoDatabase GetDatabase(WorkbenchSecret secret)
        {
            return InitMongoDb(secret);
        }

        private static IMongoDatabase InitMongoDb(WorkbenchSecret secret)
        {
            try
            {
                MongoClientSettings settings = MongoClientSettings.FromUrl(
                new MongoUrl(secret.AzCosmonMongoConnectionString)
                );
                settings.SslSettings = 
                new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
                var mongoClient = new MongoClient(settings);

                return mongoClient.GetDatabase("azworkbench-dev");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
