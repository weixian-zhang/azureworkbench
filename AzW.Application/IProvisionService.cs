using AzW.Model.Designer;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Application
{
    public interface IProvisionService
    {
        void Deploy(ProvisionContext provisionContext);
    }
}
