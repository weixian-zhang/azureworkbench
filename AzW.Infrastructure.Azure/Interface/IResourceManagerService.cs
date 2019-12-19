using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Infrastructure.Azure
{
    public interface IResourceManagerService
    {
        Task<IEnumerable<Subscription>> GetSubscriptions();

        Task<IEnumerable<ResourceGroup>> GetResourceGroups(string subscriptionId);

        IEnumerable<string> GetLocations();
    }
}
