using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;
using Microsoft.Azure.Management.Compute.Fluent;

namespace AzW.Infrastructure.AzureServices
{
    public interface IComputeInfoService
    {
       Task<IEnumerable<IVirtualMachineSize>> GetVMSizes(string location, string subscription);
    }
}