using AzW.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Infrastructure
{
    public interface IAzDeployService
    {
        void Deploy(ProvisionContext provisionContext);
    }
}
