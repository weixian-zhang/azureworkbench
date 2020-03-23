using System;
using System.Configuration;
using AzW.Infrastructure.Data;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;
using Serilog.Sinks.ApplicationInsights.Sinks.ApplicationInsights.TelemetryConverters;

[assembly: FunctionsStartup(typeof(AzW.Job.CacheHydrator.Startup))]
namespace AzW.Job.CacheHydrator
{

  public class Startup : FunctionsStartup
  {
    public override void Configure(IFunctionsHostBuilder builder)
        {
          //appsettings either from local file for dev, env var for 
           var configBuilder = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);

            IConfigurationRoot config = configBuilder.Build();

            var secret = new Secret() {
                RedisConnString = config.GetValue<string>("RedisConnString"),
                RedisHost = config.GetValue<string>("RedisHost"),
                RedisPassword = config.GetValue<string>("RedisPassword"),
                AppInsightsKey = config.GetValue<string>("AppInsightsKey"),
                ClientId = config.GetValue<string>("ClientId"),
                ClientSecret = config.GetValue<string>("ClientSecret"),
                TenantId = config.GetValue<string>("TenantId"),
                SubscriptionId = config.GetValue<string>("SubscriptionId")
            };

            var logger = InitAppInsights(secret);

            builder.Services.AddSingleton<Secret>(prov => {
                return secret;
            });

            builder.Services.AddSingleton<Logger>(prov => {
                return logger;
            });

            builder.Services.AddSingleton<ICacheRepository>(prov =>
            {
                return new CacheRepository
                  (secret.RedisHost, secret.RedisPassword, secret.RedisConnString);
            });

        }

        private Logger InitAppInsights(Secret secret){
          
          var appInsightsConfig = new TelemetryConfiguration();
          
          var logger = new LoggerConfiguration()
            .WriteTo
            .ApplicationInsights(secret.AppInsightsKey, new TraceTelemetryConverter())
            .CreateLogger();

          return logger;
        }
  }
}