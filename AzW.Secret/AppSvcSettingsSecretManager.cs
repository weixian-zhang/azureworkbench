using System;

namespace AzW.Secret
{
    public class AppSvcSettingsSecretManager : ISecretManager
    {
        public AzSecret GetSecret()
        {
            return new AzSecret()
            {
                ClientId = Environment.GetEnvironmentVariable("ClientId"),
                ClientSecret = Environment.GetEnvironmentVariable("ClientSecret"),
                TenantId = Environment.GetEnvironmentVariable("TenantId"),
                AzSQLConnectionString = Environment.GetEnvironmentVariable("AzSQLConnectionString")
            };
        }
    }
}