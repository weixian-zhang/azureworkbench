using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Infrastructure.AzureServices
{
    public interface IResourceManagerService
    {
        Task<IEnumerable<ISubscription>> GetSubscriptions();

        Task<IEnumerable<IResourceGroup>> GetResourceGroups(string subscriptionId);

        IEnumerable<string> GetLocations();
    }
}
