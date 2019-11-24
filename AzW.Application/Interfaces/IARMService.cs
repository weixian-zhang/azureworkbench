using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Application
{
    public interface IARMService
    {
        Task<IEnumerable<AzSubscription>> GetSubscriptions();
    }
}
