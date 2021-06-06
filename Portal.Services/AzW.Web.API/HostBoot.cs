using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AzW.Infrastructure.Data;
using AzW.Model;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace AzW.Web.API
{
    internal sealed class HostBoot : IHostedService
    {
        public HostBoot(ICacheRepository cache, BlobStorageManager blob)
        {
            _cache = cache;
            _blob = blob;
        }

        public async Task StartAsync(CancellationToken token)
        {

            await InitServiceTags();

            await InitVMSizes();

            await InitVMImagePublishers();

            await InitVMImages();

        }

        private async Task InitServiceTags()
        {
            if (await _cache.IsServiceTagExistAsync()) return;

            string json = await _blob.GetServiceTagJson();

            var tags = JsonConvert.DeserializeObject<IEnumerable<ServiceTag>>(json);

            foreach(var tag in tags)
            {
                string cacheKey = "servicetag" + " " +  tag.Id;
                    await _cache.SetServiceTagAsync(cacheKey, new ServiceTag()
                    {
                        Id = tag.Id,
                        Name = tag.Name
                    });
            }

            //set additional tags not in json file
            await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzurePlatformDNS", new ServiceTag()
                {
                    Id = "AzurePlatformDNS",
                    Name = "AzurePlatformDNS"
                });

            await _cache.SetServiceTagAsync
                ("servicetag" + " " +  "AzurePlatformIMDS", new ServiceTag()
            {
                Id = "AzurePlatformIMDS",
                Name = "AzurePlatformIMDS"
            });

            await _cache.SetServiceTagAsync
                ("servicetag" + " " +  "AzurePlatformLKM", new ServiceTag()
            {
                Id = "AzurePlatformLKM",
                Name = "AzurePlatformLKM"
            });

            await _cache.SetServiceTagAsync
                ("servicetag" + " " +  "VirtualNetwork", new ServiceTag()
                {
                    Id = "VirtualNetwork",
                    Name = "VirtualNetwork"
                });

            await _cache.SetServiceTagAsync
            ("servicetag" + " " +  "Internet", new ServiceTag()
            {
                Id = "Internet",
                Name = "Internet"
            });
        }

        private async Task InitVMSizes()
        {
            if (await _cache.IsVMSizeExistAsync()) return;

            string vmsizesJson = await _blob.GetVMSizesJson();

            var vmsizes = JsonConvert.DeserializeObject<IEnumerable<VMSize>>(vmsizesJson);

            foreach(var size in vmsizes)
            {
                var vmSize = new VMSize()
                {
                    Name = size.Name,
                    QueryName = size.QueryName,
                    MemoryInMB = size.MemoryInMB,
                    NumberOfCores =  size.NumberOfCores,
                    MaxNoOfDataDisks = size.MaxNoOfDataDisks
                };

                string cacheKey = "vmsize" + " " +  size.Name;
                await _cache.SetVMSizeAsync(cacheKey, vmSize);
            }
        }

        private async Task InitVMImagePublishers()
        {
             if (await _cache.IsVMImagePublisherExistAsync()) return;

             string json = await _blob.GetVMImagePublishersJson();

             var publishers = JsonConvert.DeserializeObject<IEnumerable<VMImagePublisher>>(json);

            foreach(var pub in publishers)
            {
                string searchKey = $"vmimage-publisher-{pub.SearchableName}";
                await _cache.SetItem<VMImagePublisher>(searchKey, pub);
            }
        }

        private async Task InitVMImages()
        {
            if (await _cache.IsVMImageCacheExistAsync()) return;

            string json = await _blob.GetVMImagesJson();

            var vmImages = JsonConvert.DeserializeObject<IEnumerable<VMImage>>(json);

            foreach(var image in vmImages)
            {
                string searchKey = $"vmimage-offersku-{image.Publisher}-" + image.SearcheableName;

                await _cache.SetItem<VMImage>(searchKey, image);
            }
        }

        public Task StopAsync(CancellationToken token){
            //gracefull shutdown for 5 sec, after which token will blowup. It will still wait for method return.

            return Task.FromResult(true);
        }

        private BlobStorageManager _blob;
        private ICacheRepository _cache;
    }
}