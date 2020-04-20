using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface ICacheRepository
    {
        Task<bool> IsVMImageCacheExistAsync();

        Task<bool> IsVMSizeExistAsync();

        Task<bool> IsServiceTagExistAsync();
        
        Task SetVMImageAsync(string key, VMImage value);

        Task SetVMSizeAsync(string key, VMSize value);

        Task SetServiceTagAsync(string key, ServiceTag value);

        Task<IEnumerable<VMImage>> SearchVMImagesAsync(string keyPattern);

        Task<IEnumerable<VMSize>> GetVMSizeAsync();

        Task<IEnumerable<ServiceTag>> GetServiceTagAsync();
    }
}