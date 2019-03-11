using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Rest;
using System;
using System.Collections.Generic;
using System.Text;
using static Microsoft.Azure.Management.Fluent.Azure;

namespace AzW.Application
{
    public class AzureHelper
    {
        public static IAzure CreateAzureClient(AzureInitParameters initParams)
        {
            if (_azure != null)
                return _azure;

            _initParams = initParams;

            IAuthenticated azureAuthentication = Azure.Authenticate(
                   new AzureCredentials(
                       new UserLoggedInCredential(_initParams.AccessToken),
                       new UserLoggedInCredential(_initParams.AccessToken),
                       _initParams.TenantId,
                       AzureEnvironment.AzureGlobalCloud));

            _azure = azureAuthentication.WithDefaultSubscription();

            return _azure;
        }

        private static IAzure _azure = null;
        private static AzureInitParameters _initParams = null;
    }
}
