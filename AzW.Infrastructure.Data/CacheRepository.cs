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
           //check first key exist
           var exist = await _redis.ExistsAsync(VMImageKeyPrefix + "128technology 128t networking platform");
           if(exist)
                return true;
           else
                return false;
        }

        public async Task SetVMImageAsync(string skuName, VMImage value)
        {   
            string vmimgKey = VMImageKeyPrefix + skuName;
            await _redis.AddAsync<VMImage>(vmimgKey, value, TimeSpan.FromDays(30));
        }

        public async Task<IEnumerable<VMImage>> SearchVMImagesAsync(string skuNamePattern)
        {
            var keys = await _redis.SearchKeysAsync("*" + skuNamePattern + "*");
            //var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys);
            var vmImagesKV = await _redis.GetAllAsync<VMImage>(keys);
            return vmImagesKV.Values;
        }

        private void InitRedisClient()
        {
            var redisConfiguration = new RedisConfiguration()
            {
                AbortOnConnectFail = true,
                KeyPrefix = VMImageKeyPrefix,
                Hosts = new RedisHost[]
                {
                    new RedisHost(){Host = _redisHost, Port = 6379},
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