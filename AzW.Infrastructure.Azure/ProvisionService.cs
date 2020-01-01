using AzW.Model;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Rest;
using System.Collections.Generic;

namespace AzW.Infrastructure.AzureServices
{
    public class ProvisionService : BaseService, IProvisionService
    {
        public ProvisionService(AzSDKCredentials sdkCred) :  base(sdkCred)
        {

        }

        public void Provision(ProvisionContext provisionContext)
        {
            var vnet = AzAuthClient.WithSubscription("").Networks.Define("").WithRegion("")
            .WithExistingResourceGroup("")
            .WithAddressSpace("")
            .WithSubnets(new Dictionary<string,string>(){{"",""}})
            .Create();

            // AzAuthClient.WithDefaultSubscription().VirtualMachines.Define("")
            // .WithRegion("")
            // .WithExistingResourceGroup("")
            // .WithExistingPrimaryNetwork(vnet)
            // .WithSubnet("")
            // .WithPrimaryPrivateIPAddressDynamic()
            // .WithNewPrimaryPublicIPAddress()

            throw new System.NotImplementedException();
        }
    }
}