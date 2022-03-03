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

        Task<bool> IsVMImagePublisherExistAsync();


        Task SetVMImageAsync(string key, VMImage value);

        Task SetVMSizeAsync(string key, VMSize value);

        Task SetServiceTagAsync(string key, ServiceTag value);

        Task SetItem<T>(string key, T value);

        Task<IEnumerable<VMImagePublisher>> GetAllVMImagePublishersAsync();

        Task<IEnumerable<VMImage>> GetVMImageOfferSkuAsync(string publisher);
        //Task<IEnumerable<VMImage>> GetAllVMImagesAsync();

        Task<IEnumerable<VMSize>> GetVMSizeAsync();

        Task<IEnumerable<ServiceTag>> GetServiceTagAsync();
    }
}