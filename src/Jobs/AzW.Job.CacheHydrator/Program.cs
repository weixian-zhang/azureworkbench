using System;
using System.Threading.Tasks;
using AzW.Infrastructure.Data;
using AzW.Secret;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Core;
using Serilog.Events;

namespace AzW.Job.CacheHydrator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("CacheHydrator - started main");

            var host = new HostBuilder()
                
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureWebJobs((builder) => {
                    builder.AddAzureStorageCoreServices();
                    builder.AddTimers();
                })
                .ConfigureServices((services) =>
                {
                    {
                        Console.WriteLine("CacheHydrator - loading configuration");

                        var configBuilder = new ConfigurationBuilder()
                            .AddEnvironmentVariables()
                            .SetBasePath(Environment.CurrentDirectory)
                            .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);

                        IConfigurationRoot config = configBuilder.Build();

                        var secret = new WorkbenchSecret() {
                            AzCosmonMongoConnectionString = config.GetValue<string>("AzCosmonMongoConnectionString"),
                            StorageConnString = config.GetValue<string>("StorageConnString"),
                            ServiceTagFileName = config.GetValue<string>("ServiceTagFileName"),
                            RedisConnString = config.GetValue<string>("RedisConnString"),
                            RedisHost = config.GetValue<string>("RedisHost"),
                            RedisPassword = config.GetValue<string>("RedisPassword"),
                            AppInsightsKey = config.GetValue<string>("AppInsightsKey"),
                            // ClientId = config.GetValue<string>("ClientId"),
                            // ClientSecret = config.GetValue<string>("ClientSecret"),
                            TenantId = config.GetValue<string>("TenantId"),
                            SubscriptionId = config.GetValue<string>("SubscriptionId")
                        };

                        var logger = InitLogger(secret);

                        // services.AddSingleton<WorkbenchSecret>(prov => {
                        //     return secret;
                        // });

                        services.AddSingleton<Logger>(prov => {
                            return logger;
                        });

                        services.AddSingleton<WorkbenchSecret>(prov => {
                            return secret;
                        });

                        services.AddSingleton<ICacheRepository>(prov =>
                        {
                            return new CacheRepository
                            ( secret.RedisConnString, secret.RedisHost, secret.RedisPassword);
                        });

                        Console.WriteLine("CacheHydrator - configuration loaded");
                    }
                })
                .Build();

            host.Run();
        }

        private static Logger InitLogger(WorkbenchSecret secret){
          
          var appInsightsConfig = new TelemetryConfiguration();
          
          var logger = new Serilog.LoggerConfiguration()
            .WriteTo
              .MongoDB(CosmosDbHelper.GetDatabase(secret),LogEventLevel.Verbose, "Log-CacheHydrator")
            // .WriteTo
            // . ApplicationInsights(secret.AppInsightsKey, new TraceTelemetryConverter())
            .CreateLogger();

          return logger;
        }
    }
}