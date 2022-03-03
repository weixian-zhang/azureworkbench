using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Model;
using Newtonsoft.Json;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core;
using StackExchange.Redis.Extensions.Core.Abstractions;
using StackExchange.Redis.Extensions.Core.Configuration;
using StackExchange.Redis.Extensions.Newtonsoft;

namespace AzW.Infrastructure.Data
{
    public class CacheRepository : ICacheRepository
    {
        const int CacheItemExpiryDays = 30;
        private string _redisHost;
        private string _redisConnString;
        private string _redisPassword;
        private const string VMImageKeyPrefix = "vmimgKey_";
        private IRedisDatabase _redis;

        public CacheRepository
            (string redisConnString, string redisHost, string redisPassword)
        {
            _redisHost = redisHost;
            _redisPassword = redisPassword;
            _redisConnString = redisConnString;

            InitRedisClient();
        }

        public async Task<bool> IsVMImageCacheExistAsync()
        {
           var keys = await _redis.SearchKeysAsync("vmimage-offersku-*");
           if(keys.Count() > 0)
                return true;
           else
                return false;
        }

        public async Task<bool> IsVMSizeExistAsync()
        {
           var keys = await _redis.SearchKeysAsync("vmsize*");
           if(keys.Count() > 0)
                return true;
           else
                return false;
        }

        public async Task<bool> IsVMImagePublisherExistAsync()
        {
           var keys = await _redis.SearchKeysAsync("vmimage-publisher*");
           if(keys.Count() > 0)
                return true;
           else
                return false;
        }

        public async Task<bool> IsServiceTagExistAsync()
        {
            try
            {
                var keys = await _redis.SearchKeysAsync("servicetag*");
                if(keys.Count() > 0)
                        return true;
                else
                        return false;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task SetServiceTagAsync(string key, ServiceTag value)
        {
            await SetItem<ServiceTag>(key, value);
            //await _redis.AddAsync<ServiceTag>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task SetVMImageAsync(string key, VMImage value)
        {
            await SetItem<VMImage>(key, value);
            //await _redis.AddAsync<VMImage>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task SetVMSizeAsync(string key, VMSize value)
        {
            await SetItem<VMSize>(key, value);
            //await _redis.AddAsync<VMSize>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task SetItem<T>(string key, T value)
        {
             await _redis.AddAsync<T>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        // public async Task<IEnumerable<VMImage>> GetAllVMImagesAsync()
        // {
        //     IEnumerable<string> keys = await _redis.SearchKeysAsync("vmimage-offersku-*");
        //     var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys);
        //     var vmimages = vmImagesKV.Values;
        //     var result = new List<VMImage>();

        //     foreach(var img in vmimages)
        //     {
        //         string newSku = img.Sku.Replace("-", " ").Replace("_"," ");
        //         result.Add(new VMImage
        //             {
        //                 DisplayName = img.Publisher + " " + img.Offer + " " + newSku,
        //                 Publisher = img.Publisher,
        //                 Offer = img.Offer,
        //                 Sku = img.Sku
        //             });
        //     }

        //     return result;
        // }

        public async Task<IEnumerable<VMImagePublisher>> GetAllVMImagePublishersAsync()
        {
             string searchQuery = $"vmimage-publisher-*";

             IEnumerable<string> keys = await _redis.SearchKeysAsync(searchQuery);

            var kvs = await _redis.GetAllAsync<VMImagePublisher>(keys.ToArray());

            return kvs.Values;
        }

        public async Task<IEnumerable<VMImage>> GetVMImageOfferSkuAsync(string publisher)
        {
            string searchQuery = $"vmimage-offersku-{publisher}-*";

            IEnumerable<string> keys = await _redis.SearchKeysAsync(searchQuery);

            var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys.ToArray());

            return vmImagesKV.Values;

            // if(keys.Count() == 0)
            //     keys = await _redis.SearchKeysAsync("*" + skuNamePattern + "*");
        }

        public async Task<IEnumerable<VMSize>> GetVMSizeAsync()
        {
            IEnumerable<string> keys = await _redis.SearchKeysAsync("vmsize*");

            var vmSizeKV = await _redis.GetAllAsync<VMSize>(keys.ToArray());

            return vmSizeKV.Values;
        }

        public async Task<IEnumerable<ServiceTag>> GetServiceTagAsync()
        {
             IEnumerable<string> keys = await _redis.SearchKeysAsync("servicetag*");

            var stKV = await _redis.GetAllAsync<ServiceTag>(keys.ToArray());

            return stKV.Values;
        }

        private void InitRedisClient()
        {
            var redisConfiguration = new RedisConfiguration()
            {
                AbortOnConnectFail = false,
                KeyPrefix = VMImageKeyPrefix,
                Hosts = new RedisHost[]
                {
                    new RedisHost(){Host = _redisHost, Port = 6380},
                },
                AllowAdmin = false,
                ConnectTimeout = 30000,
                Database = 0,
                Ssl = true,
                Password = _redisPassword,

                ServerEnumerationStrategy = new ServerEnumerationStrategy()
                {
                    Mode = ServerEnumerationStrategy.ModeOptions.All,
                    TargetRole = ServerEnumerationStrategy.TargetRoleOptions.Any,
                    UnreachableServerAction = ServerEnumerationStrategy.UnreachableServerActionOptions.Throw
                }
            };

            var jsonOpt = new JsonSerializerSettings()
            {
                Formatting = Formatting.None,
                NullValueHandling = NullValueHandling.Ignore

            };

           //ConnectionMultiplexer redisConn = ConnectionMultiplexer.Connect(redisConnString);
            var cache = new RedisCacheClient(new SinglePool(_redisConnString),
                new NewtonsoftSerializer(jsonOpt), redisConfiguration);

            _redis = cache.Db0;
        }



        
    }

    internal class SinglePool : IRedisCacheConnectionPoolManager
    {
        private readonly IConnectionMultiplexer connection;

        public SinglePool(string connectionString)
        {
            this.connection = ConnectionMultiplexer.Connect(connectionString);
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public IConnectionMultiplexer GetConnection()
        {
            return connection;
        }
    }
}