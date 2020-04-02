using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AzW.Web.API
{
    public class Program
    {
        private static IConfiguration _configuration;

        public static void Main(string[] args)
        {
            LoadConfiguration();

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseConfiguration(_configuration);
                    webBuilder.UseUrls("http://*:8089");
                    webBuilder.UseStartup<Startup>();
                });

        private static void LoadConfiguration()
        {
            string env = Environment.GetEnvironmentVariable("env");

            var builder = new ConfigurationBuilder();

            if(string.IsNullOrEmpty(env) || env == "dev")
                builder.AddUserSecrets("7211aa50-115d-4544-9cf0-c4499c5f2e9f");
            else
                builder.AddEnvironmentVariables();
                
            _configuration = builder.Build();
        }
    }
}
