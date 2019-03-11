using AzW.Model.Designer;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Designer
{
    public interface IProvisionManager
    {
        void Deploy(ProvisionContext provisionContext);
    }
}
