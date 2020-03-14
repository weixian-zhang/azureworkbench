using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.AzureServices
{
    public interface IComputeInfoService
    {
        Task<IEnumerable<VMImageReference>> GetImageReferences(string subscription);
    }
}