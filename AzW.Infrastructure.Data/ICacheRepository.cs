using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface ICacheRepository
    {
        Task<bool> IsVMImageCacheExistAsync();
        
        Task SetVMImageAsync(string key, VMImage value);

        Task<IEnumerable<VMImage>> SearchVMImagesAsync(string keyPattern);
    }
}