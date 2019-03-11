using Microsoft.Azure.Management.ResourceManager.Fluent;
using System;
using System.Collections.Generic;

namespace AzW.Designer
{
    public interface IARMManager
    {
        IEnumerable<ISubscription> GetSubscriptions();

        IEnumerable<IResourceGroup> GetResourceGroups();
    }
}
