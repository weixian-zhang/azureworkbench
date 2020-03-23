namespace AzW.Job.CacheHydrator
{
    public class Secret
    {
        public string RedisConnString { get; set; }
        public string RedisHost { get; set; }
        public string RedisPassword { get; set; }
        public string AppInsightsKey { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string TenantId { get; set; }
        public string SubscriptionId { get; set; }
    }
}