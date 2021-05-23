using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using RazorEngine.Text;

namespace AzW.Infrastructure.AzureServices
{
    //zipoutput stream
    //https://microsoft.github.io/AzureTipsAndTricks/blog/tip141.html


    public class BicepGenerator : ITemplateGenerator
    {
        public BicepGenerator()
        {
            InitRazorRngine();
        }

        private static void InitRazorRngine()
        {
            var config = new TemplateServiceConfiguration();
            config.EncodedStringFactory = new RawStringFactory(); // Raw string encoding instead of html

            var svc = RazorEngineService.Create(config);

            Engine.Razor = svc;
        }

        public string Generate(dynamic[] azcontexts)
        {
            string bicep = "";

            try
            {
                var resourceContext = TemplateHelper.CreateResourceContext(azcontexts);

                string multifileTemplate = TemplateHelper.GetMainTemplate(_webrootPath);

                bicep = Engine.Razor.RunCompile(multifileTemplate, "multifile-main", resourceContext.GetType(), resourceContext);

                bicep = TemplateHelper.ReplaceMultiLinBreaksWithSingle(bicep);

                bicep = TemplateHelper.FormatBicep(bicep);

                return bicep;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return bicep;
        }

        private dynamic[] _azcontexts;
        private string _webrootPath;
    }
}