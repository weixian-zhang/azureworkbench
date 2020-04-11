using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface ICacheRepository
    {
        Task<bool> IsVMImageCacheExistAsync();

        Task<bool> IsVMSizeExistAsync();
        
        Task SetVMImageAsync(string key, VMImage value);

        Task SetVMSizeAsync(string key, VMSize value);

        Task<IEnumerable<VMImage>> SearchVMImagesAsync(string keyPattern);
    }
}