
using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Application
{
    public interface IComputeService
    {
        Task<IEnumerable<string>> GetLocations();
        
        Task<IEnumerable<VMImage>> GetVMImagesAsync(string location);
    }
}
