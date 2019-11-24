namespace AzW.Web.API
{
    public class WorkbenchSecret
    {
       public string AzCosmonMongoConnectionString { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }

        public string TenantId { get; set; }

        public string AccessToken { get; set; }
    }
}