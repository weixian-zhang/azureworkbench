using AzW.Model;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Rest;

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(AzSDKCredentials sdkCred) :  base(sdkCred)
        {

        }

        public void Provision(ProvisionContext provisionContext)
        {
            throw new System.NotImplementedException();
        }
    }
}