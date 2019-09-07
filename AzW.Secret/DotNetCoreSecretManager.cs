using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace AzW.Secret
{
    public class DoNetCoreSecretManager : ISecretManager
    {
        public static IConfigurationRoot Configuration { get; set; }
        
        public AzSecret GetSecret()
        {
            var builder = new ConfigurationBuilder();
            builder.AddUserSecrets<AzSecret>();
            Configuration = builder.Build();

            return new AzSecret()
            {
                ClientId = Configuration["ClientId"],
                ClientSecret = Configuration["ClientSecret"],
                TenantId = Configuration["TenantId"],
                AzSQLConnectionString = Configuration["AzSQLConnectionString"],
            };
            
        }
    }
}