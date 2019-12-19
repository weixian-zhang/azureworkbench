using AzW.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Infrastructure.AzureServices
{
    public interface IProvisionService
    {
        void Provision(ProvisionContext provisionContext);
    }
}
