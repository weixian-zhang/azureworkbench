using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Infrastructure
{
    public interface IAzArmService
    {
        Task<IEnumerable<Subscription>> GetSubscriptions();

        Task<IEnumerable<ResourceGroup>> GetResourceGroups(string subscriptionId);
    }
}
