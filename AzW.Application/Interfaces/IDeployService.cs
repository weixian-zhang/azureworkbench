using AzW.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Application
{
    public interface IDeployService
    {
        void Deploy(ProvisionContext provisionContext);
    }
}
