using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Models;

namespace AzW.Application
{
    public interface IAzureInfoService
    {
        Task<IEnumerable<AzSubscription>> GetSubscriptions();

        Task<IEnumerable<AzResourceGroup>> GetResourceGroups();

        Task<IEnumerable<AzLocation>> GetLocations();
    }
}
