namespace AzW.Secret
{
    public class WorkbenchSecret
    {
       public string SubscriptionId { get; set; }
       public string AzCosmonMongoConnectionString { get; set; }
       public string AzBlobConnString { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }

        public string TenantId { get; set; }

        public string AccessToken { get; set; }

        public string UserUPN { get; set; }

        public string PortalUrl { get; set; }

        public string AppInsightsKey { get; set; }

        public string LibwkhtmltoxPath { get; set; }

        public string RedisConnString { get; set; }
        public string RedisHost { get; set; }
        public string RedisPassword { get; set; }
    }
}