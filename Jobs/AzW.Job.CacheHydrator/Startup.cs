using System;
using System.Configuration;
using AzW.Infrastructure.Data;
using AzW.Secret;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Sinks.ApplicationInsights.Sinks.ApplicationInsights.TelemetryConverters;

[assembly: FunctionsStartup(typeof(AzW.Job.CacheHydrator.Startup))]
namespace AzW.Job.CacheHydrator
{

  public class Startup : FunctionsStartup
  {
    public override void Configure(IFunctionsHostBuilder builder)
        {
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
                ClientId = config.GetValue<string>("ClientId"),
                ClientSecret = config.GetValue<string>("ClientSecret"),
                TenantId = config.GetValue<string>("TenantId"),
                SubscriptionId = config.GetValue<string>("SubscriptionId")
            };

            var logger = InitLogger(secret);

            builder.Services.AddSingleton<WorkbenchSecret>(prov => {
                return secret;
            });

            builder.Services.AddSingleton<Logger>(prov => {
                return logger;
            });

            builder.Services.AddSingleton<ICacheRepository>(prov =>
            {
                return new CacheRepository
                  ( secret.RedisConnString, secret.RedisHost, secret.RedisPassword);
            });

        }

        private Logger InitLogger(WorkbenchSecret secret){
          
          var appInsightsConfig = new TelemetryConfiguration();
          
          var logger = new LoggerConfiguration()
            .WriteTo
              .MongoDB(CosmosDbHelper.GetDatabase(secret),LogEventLevel.Verbose, "Log-CacheHydrator")
            // .WriteTo
            // . ApplicationInsights(secret.AppInsightsKey, new TraceTelemetryConverter())
            .CreateLogger();

          return logger;
        }
  }
}