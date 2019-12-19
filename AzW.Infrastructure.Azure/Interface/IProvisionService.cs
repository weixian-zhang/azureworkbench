using AzW.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Infrastructure.Azure
{
    public interface IProvisionService
    {
        void Provision(ProvisionContext provisionContext);
    }
}
