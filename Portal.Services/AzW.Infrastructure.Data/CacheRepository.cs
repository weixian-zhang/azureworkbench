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
           var keys = await _redis.SearchKeysAsync("vmimage*");
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

        public async Task<bool> IsServiceTagExistAsync()
        {
           var keys = await _redis.SearchKeysAsync("servicetag*");
           if(keys.Count() > 0)
                return true;
           else
                return false;
        }

        public async Task SetServiceTagAsync(string key, ServiceTag value)
        {
            await _redis.AddAsync<ServiceTag>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task SetVMImageAsync(string key, VMImage value)
        {
            await _redis.AddAsync<VMImage>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task SetVMSizeAsync(string key, VMSize value)
        {
            await _redis.AddAsync<VMSize>(key, value, TimeSpan.FromDays(CacheItemExpiryDays));
        }

        public async Task<IEnumerable<VMImage>> GetAllVMImagesAsync()
        {
            IEnumerable<string> keys = await _redis.SearchKeysAsync("vmimage*");
            var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys);
            return vmImagesKV.Values;
        }

        public async Task<IEnumerable<VMImage>> SearchVMImagesAsync(string skuNamePattern)
        {
            IEnumerable<string> keys = await _redis.SearchKeysAsync(skuNamePattern + "*");

            if(keys.Count() == 0)
                keys = await _redis.SearchKeysAsync("*" + skuNamePattern + "*");

            var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys);

            return vmImagesKV.Values;
        }

        public async Task<IEnumerable<VMSize>> GetVMSizeAsync()
        {
            IEnumerable<string> keys = await _redis.SearchKeysAsync("vmsize*");

            var vmSizeKV = await _redis.GetAllAsync<VMSize>(keys);

            return vmSizeKV.Values;
        }

        public async Task<IEnumerable<ServiceTag>> GetServiceTagAsync()
        {
             IEnumerable<string> keys = await _redis.SearchKeysAsync("servicetag*");

            var stKV = await _redis.GetAllAsync<ServiceTag>(keys);

            return stKV.Values;
        }

        private void InitRedisClient()
        {
            var redisConfiguration = new RedisConfiguration()
            {
                AbortOnConnectFail = true,
                KeyPrefix = VMImageKeyPrefix,
                Hosts = new RedisHost[]
                {
                    new RedisHost(){Host = _redisHost, Port = 6380},
                },
                AllowAdmin = false,
                ConnectTimeout = 3000,
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



        private string _redisHost;
        private string _redisConnString;
        private string _redisPassword;
        private const string VMImageKeyPrefix = "vmimgKey_";
        private IRedisDatabase _redis;
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