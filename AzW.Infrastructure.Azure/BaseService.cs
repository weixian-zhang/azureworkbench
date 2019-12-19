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
        public BaseService(AzSDKCredentials azSDKCred)
        {
            var azureCreds = new AzureCredentials
                (azSDKCred, azSDKCred, azSDKCred.TenantId, AzureEnvironment.AzureGlobalCloud);

            IAuthenticated azAuthClient =
                Azure.Configure().Authenticate(azureCreds);
        }

        private AzSDKCredentials _azCred;

        private IAuthenticated _azAuthClient { get; set; }
        public IAuthenticated AzAuthClient { get {return _azAuthClient;} }
    }
}