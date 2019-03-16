using System;
using System.Collections.Generic;
using System.Text;
using AzW.Model.Designer;

using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.Network.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

namespace AzW.Designer
{
    public class ProvisionManager : IProvisionManager
    {
        public ProvisionManager(IAzure azure)
        {
            _azure = azure;
        }

        public void Deploy(ProvisionContext provisionContext)
        {
            _azure.VirtualMachines.Define("")
                .WithRegion(Region.AsiaSouthEast)
                .WithExistingResourceGroup("")
                .WithNewPrimaryNetwork("10.0.0.0/8")
                .WithPrimaryPrivateIPAddressDynamic()
                .WithoutPrimaryPublicIPAddress()
                .WithSpecificWindowsImageVersion(new ImageReference() {
                    Sku = "2019-Datacenter",
                    Offer = "WindowsServer",
                    Publisher = "MicrosoftWindowsServer"
                });

            

        }

        private IAzure _azure;
    }
}
