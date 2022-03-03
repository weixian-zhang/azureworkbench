using System;
using System.Security.Authentication;
using AzW.Model;
using AzW.Secret;
using MongoDB.Driver;

namespace AzW.Infrastructure.Data
{
    public static class CosmosDbHelper
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

                settings.RetryReads = true;
                settings.RetryWrites = false;
                settings.MaxConnectionIdleTime = TimeSpan.FromMinutes(5);

                var mongoClient = new MongoClient(settings);

                return mongoClient.GetDatabase("azworkbench");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
