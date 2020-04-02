
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using AzW.Secret;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Rest.Azure;

namespace AzW.Infrastructure.AzureServices
{
    public interface IARMService
    {
        Task CreateResourceGroup(string subscription, string location, string rgName);
        Task<IEnumerable<ISubscription>> GetSubscriptions();
        Task<IEnumerable<IResourceGroup>> GetResourceGroups(string subscription);
    }
}