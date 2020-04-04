using AzW.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzW.Infrastructure.AzureServices
{
    public interface IProvisionService
    {
        Task ProvisionAsync(dynamic[] provisionContexts);
    }
}
