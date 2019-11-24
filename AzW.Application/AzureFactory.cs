
namespace AzW.Application
{
    public sealed class AzureFactory
    {
        public AzureFactory()
        {
        }

        public static IAzService AuthAndCreateInstance
            (string accessToken, string tenantId, string clientId, string clientSecret)
        {
            _azCred = new AzSDKCredentials(accessToken, tenantId, clientId, clientSecret);

            return new AzService()
            {
               ArmService = new ARMService(_azCred),
               
            };
        }

        private static AzSDKCredentials _azCred;
    }
}