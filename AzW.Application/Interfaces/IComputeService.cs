
using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Dto;

namespace AzW.Application
{
    public interface IComputeService
    {
        Task<IEnumerable<string>> GetLocations();
        
        Task<IEnumerable<VMImage>> GetVMImagesAsync(string location);
    }
}
