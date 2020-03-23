using System.Collections.Generic;
using System.Net.Http;
using AzW.Secret;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Identity.Client;
using static Microsoft.Azure.Management.Fluent.Azure;

namespace AzW.Infrastructure.AzureServices
{
    public abstract class BaseService
    {
        public BaseService(string accessToken, WorkbenchSecret secret) //(AzSDKCredentials azSDKCred)
        {
            var sdkCred =
                new ServiceClientOBOCredentials(accessToken, "common", secret.ClientId, secret.ClientSecret);

            var azureCreds = new AzureCredentials
                (sdkCred, null, "common", AzureEnvironment.AzureGlobalCloud);

            _azClient = Azure.Configure().Authenticate(azureCreds);
        }

        private ServiceClientOBOCredentials _azCred;

        private IAuthenticated _azClient { get; set; }
        public IAuthenticated AzClient { get {return _azClient;} }
    }
}