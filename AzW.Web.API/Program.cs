using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AzW.Web.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var loader = 
            new CustomAssemblyLoadContext()
                .LoadUnmanagedLibrary($"{path}/libwkhtmltox.dll");

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseUrls("http://*:8089");
                    webBuilder.UseStartup<Startup>();
                });
    }
}
