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

        }

        private async Task InitServiceTags()
        {
            string json = await _blob.GetServiceTagJson();

            var tags = JsonConvert.DeserializeObject<IEnumerable<ServiceTag>>(json);
        }

        public Task StopAsync(CancellationToken token){
            //gracefull shutdown for 5 sec, after which token will blowup. It will still wait for method return.

            return Task.FromResult(true);
        }

        private BlobStorageManager _blob;
        private ICacheRepository _cache;
    }
}