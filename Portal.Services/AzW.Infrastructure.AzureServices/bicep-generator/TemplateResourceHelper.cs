using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using AzW.Model;
using Newtonsoft.Json.Linq;
using RandomNameGeneratorLibrary;

namespace AzW.Infrastructure.AzureServices
{
    public class TemplateResourceHelper
    {

        public static string GetMainTemplate(string webrootpath)
        {
            string execDir = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            using (var sr = new StreamReader(Path.Combine(execDir, @".\bicep-template\main.cshtml")))
            {
                return sr.ReadToEnd();
            }
        }

        public static ResourceContext CreateResourceContext(dynamic[] azcontexts)
        {
            var rc = new ResourceContext();

            var resources = new List<Resource>();

            rc.Resources = resources;

            if(azcontexts != null && azcontexts.Length > 0)
            {
                foreach(dynamic azcontext in azcontexts)
                {
                    JObject jObj = JObject.Parse(azcontext.ToString());
                    string resourceType = jObj["ResourceType"].ToString();

                    switch(resourceType)
                        {
                            case ResourceType.NSG:
                                NSG nsg = jObj.ToObject<NSG>();
                                nsg.ResourceType = ResourceType.NSG;
                                resources.Add(nsg);
                            break;
                            case ResourceType.VNet:
                                VNet vnet = jObj.ToObject<VNet>();
                                vnet.ResourceType = ResourceType.VNet;
                                resources.Add(vnet);
                            break;
                            case ResourceType.VM:
                                VM vm = jObj.ToObject<VM>();
                                 vm.ResourceType = ResourceType.VM;
                                 resources.Add(vm);
                            break;
                            case ResourceType.VMSS:
                                VMSS vmss = jObj.ToObject<VMSS>();
                                vmss.ResourceType = ResourceType.VMSS;
                                 resources.Add(vmss);
                            break;
                            case ResourceType.NLB:
                                NLB nlb = jObj.ToObject<NLB>();
                                nlb.ResourceType = ResourceType.NLB;
                                resources.Add(nlb);
                            break;
                            case ResourceType.AppGw:
                                AppGateway appgw = jObj.ToObject<AppGateway>();
                                appgw.ResourceType = ResourceType.AppGw;
                                resources.Add(appgw);
                            break;
                            case ResourceType.Firewall:
                                Firewall fw = jObj.ToObject<Firewall>();
                                fw.ResourceType = ResourceType.Firewall;
                                resources.Add(fw);
                            break;
                            case ResourceType.AppService:
                                WebApp webapp = jObj.ToObject<WebApp>();
                                webapp.ResourceType = ResourceType.AppService;
                                resources.Add(webapp);
                            break;
                            case ResourceType.ASE:
                                ASE ase = jObj.ToObject<ASE>();
                                ase.ResourceType = ResourceType.ASE;
                                resources.Add(ase);
                            break;
                            case ResourceType.Function:
                                Function func = jObj.ToObject<Function>();
                                func.ResourceType = ResourceType.Function;
                                resources.Add(func);
                            break;
                            case ResourceType.StorageAccount:
                                StorageAccount sa = jObj.ToObject<Model.StorageAccount>();
                                sa.ResourceType = ResourceType.StorageAccount;
                                resources.Add(sa);
                            break;
                            case ResourceType.AzFile:
                                StorageAccount file = jObj.ToObject<Model.StorageAccount>();
                                file.ResourceType = ResourceType.AzFile;
                                resources.Add(file);
                            break;
                            case ResourceType.LogAnalytics:
                                LogAnalytics law = jObj.ToObject<LogAnalytics>();
                                law.ResourceType = ResourceType.LogAnalytics;
                                resources.Add(law);
                            break;
                            case ResourceType.AppInsights:
                                AppInsights appinsights = jObj.ToObject<AppInsights>();
                                appinsights.ResourceType = ResourceType.AppInsights;
                                resources.Add(appinsights);
                            break;
                            case ResourceType.CosmosDB:
                                CosmosDB cosmos = jObj.ToObject<CosmosDB>();
                                cosmos.ResourceType = ResourceType.CosmosDB;
                                resources.Add(cosmos);
                            break;
                            case ResourceType.RecoveryServiceVault:
                                RecoveryServiceVault rsv = jObj.ToObject<RecoveryServiceVault>();
                                rsv.ResourceType = ResourceType.RecoveryServiceVault;
                                resources.Add(rsv);
                            break;
                            case ResourceType.SecurityCenter:
                                SecurityCenter asc = jObj.ToObject<SecurityCenter>();
                                asc.ResourceType = ResourceType.SecurityCenter;
                                resources.Add(asc);
                            break;
                        }
                }
            }

            rc.Resources = FillEmptyResouceNames(rc.Resources);

            return rc;
        }

        private static List<Resource> FillEmptyResouceNames(List<Resource> resources)
        {
            return resources;
        }

        public static bool IsResourceExist(List<Resource> resources, string rscType, string rscName)
        {
            var rsc = resources.Where(x => x.ResourceType == rscType && x.Name == rscName);

            if(rsc.Count() > 0)
                return true;
            else
                return false;
        }
    }
}
