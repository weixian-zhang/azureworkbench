using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.Security;

namespace AzW.Infrastructure.Azure
{
    public sealed class AzureClientFactory
    {
        public AzureClientFactory()
        {
        }

        public static IAzureClient AuthAndCreateInstance
            (string accessToken, string tenantId, string clientId, string clientSecret)
        {
            _azCred = new AzSDKCredentials(accessToken, tenantId, clientId, clientSecret);

            return new AzureClient()
            {
                SubscriptionManager = new SubscriptionClient(_azCred),
                SecurityCenterClient = new SecurityCenterClient(_azCred)
            };
        }

        private static AzSDKCredentials _azCred;
    }
}