using AzW.Model;
using AzW.Model.Designer;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Application
{
    public interface IARMService
    {
        IEnumerable<AzSubscription> GetSubscriptions();

        IEnumerable<AzResourceGroup> GetResourceGroups();

        IEnumerable<string> GetRegions();

        Task<IEnumerable<VMImage>> GetVMImagesAsync(string region);
    }
}
