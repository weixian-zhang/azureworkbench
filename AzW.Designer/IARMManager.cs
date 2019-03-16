using AzW.Model.Designer;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzW.Designer
{
    public interface IARMManager
    {
        IEnumerable<ISubscription> GetSubscriptions();

        IEnumerable<IResourceGroup> GetResourceGroups();

        IEnumerable<string> GetRegions();

        Task<IEnumerable<VMImage>> GetVMImagesAsync(string region);
    }
}
