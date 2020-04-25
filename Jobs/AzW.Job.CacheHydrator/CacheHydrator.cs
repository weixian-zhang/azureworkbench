using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Infrastructure.Data;
using AzW.Model;
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.Network.Fluent;
using Microsoft.Azure.Management.Network.Fluent.Models;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using Serilog;
using Serilog.Core;
using Serilog.Sinks.ApplicationInsights.Sinks.ApplicationInsights.TelemetryConverters;

namespace AzW.Job.CacheHydrator
{
    public class CacheHydrator
    {
        public CacheHydrator(Secret secret, ICacheRepository cache, Serilog.Core.Logger logger)
        {
            _secret = secret;
            _cache = cache;
            _logger = logger;

            sdkCred =
                new ServiceClientCredential(_secret.TenantId, _secret.ClientId, _secret.ClientSecret);
            
            azureCreds = new AzureCredentials
                (sdkCred, null, _secret.TenantId, AzureEnvironment.AzureGlobalCloud);
        }

        [FunctionName("CacheHydrator")]
        public async Task Run([TimerTrigger("*/2 * * * * *")]TimerInfo myTimer, Microsoft.Extensions.Logging.ILogger log)
        {
            await HydrateServiceTag();

            await HydrateVMSizes();

            await HydrateVMImages();
        }

        public async Task HydrateVMSizes() 
        {
            if(await _cache.IsVMSizeExistAsync())
                return;
            
            var azure = Azure.Configure().Authenticate(azureCreds);

            var vmSizes = await azure
                    .WithSubscription(_secret.SubscriptionId)
                    .VirtualMachines.Sizes.ListByRegionAsync("southeastasia");
                    
                foreach(var size in vmSizes)
                {
                    var vmSize = new VMSize() 
                    {
                        Name = size.Name,
                        MemoryInMB = size.MemoryInMB,
                        NumberOfCores =  size.NumberOfCores,
                        MaxNoOfDataDisks = size.MaxDataDiskCount
                    };

                    string cacheKey = "vmsize" + " " +  size.Name;
                    await _cache.SetVMSizeAsync(cacheKey, vmSize);
                }
        }

        private async Task HydrateServiceTag()
        {
            try
            {
                if(await _cache.IsServiceTagExistAsync())
                    return;

                var restClient = RestClient.Configure()
                    .WithEnvironment(AzureEnvironment.AzureGlobalCloud)
                    .WithCredentials(azureCreds)
                    .Build();

                using (var client = new NetworkManagementClient(restClient))
                {
                    client.SubscriptionId = _secret.SubscriptionId;

                    var nsg = new NetworkSecurityGroupInner();
                    SecurityRuleInner ruleInner;
        
                    var tags = await client.ServiceTags.ListAsync("southeastasia");

                    foreach(var svcTagInfo in tags.Values)
                    {
                        string cacheKey = "servicetag" + " " +  svcTagInfo.Id;
                        await _cache.SetServiceTagAsync(cacheKey, new ServiceTag()
                        {
                            Id = svcTagInfo.Id,
                            Name = svcTagInfo.Name
                        });
                    }

                    //add tags not found in Azure API
                    await _cache.SetServiceTagAsync
                        ("servicetag" + " " +  "ActionGroup", new ServiceTag()
                    {
                        Id = "ActionGroup",
                        Name = "ActionGroup"
                    });

                    //add tags not found in Azure API
                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "ApplicationInsightsAvailability", new ServiceTag()
                    {
                        Id = "ApplicationInsightsAvailability",
                        Name = "ApplicationInsightsAvailability"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AppConfiguration", new ServiceTag()
                    {
                        Id = "AppConfiguration",
                        Name = "AppConfiguration"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureActiveDirectory", new ServiceTag()
                    {
                        Id = "AzureActiveDirectory",
                        Name = "AzureActiveDirectory"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureDevSpaces", new ServiceTag()
                    {
                        Id = "AzureDevSpaces",
                        Name = "AzureDevSpaces"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureSignalR", new ServiceTag()
                    {
                        Id = "AzureSignalR",
                        Name = "AzureSignalR"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureLoadBalancer", new ServiceTag()
                    {
                        Id = "AzureLoadBalancer",
                        Name = "AzureLoadBalancer"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureSiteRecovery", new ServiceTag()
                    {
                        Id = "AzureSiteRecovery",
                        Name = "AzureSiteRecovery"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "DataFactory", new ServiceTag()
                    {
                        Id = "DataFactory",
                        Name = "DataFactory"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "LogicApps", new ServiceTag()
                    {
                        Id = "LogicApps",
                        Name = "LogicApps"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "LogicAppsManagement", new ServiceTag()
                    {
                        Id = "LogicAppsManagement",
                        Name = "LogicAppsManagement"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "VirtualNetwork", new ServiceTag()
                    {
                        Id = "VirtualNetwork",
                        Name = "VirtualNetwork"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "Internet", new ServiceTag()
                    {
                        Id = "Internet",
                        Name = "Internet"
                    });
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private async Task HydrateVMImages()
        {
            if(!await _cache.IsVMImageCacheExistAsync())
            {
                foreach(var vmImg in GetImageReferences())
                {
                    try
                    {
                        await _cache.SetVMImageAsync(vmImg.SearchPattern, vmImg);
                    }
                    catch(Exception ex)
                    {
                        _logger.Error(ex, ex.Message);
                        continue;
                    }
                }
            }
        }

        public IEnumerable<VMImage> GetImageReferences()
        {
            IEnumerable<IVirtualMachinePublisher> publishers = null;

            try
            {     
                var _azure = Azure.Configure().Authenticate(azureCreds);
                        
                publishers = _azure.WithSubscription(_secret.SubscriptionId)
                    .VirtualMachineImages.Publishers.ListByRegion(Region.AsiaSouthEast);
            }
            catch(Exception ex)
            {
                _logger.Error(ex, ex.Message);
                throw ex;
            }

            int limit = 0;

            var vmImages = new List<VMImage>();

            foreach (var publisher in publishers)
            {
                if(StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "Canonical") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "SUSE") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "RedHat") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "Debian") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftWindowsServer") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftWindowsDesktop") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "Oracle") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftSharePoint") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftVisualStudio") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftDynamicsAX") || 
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "MicrosoftSQLServer") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "center-for-internet-security-inc") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "paloaltonetworks") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "checkpoint") ||
                   StringComparer.OrdinalIgnoreCase.Equals(publisher.Name, "barracudanetworks"))
                   {
                        foreach (var offer in publisher.Offers.List())
                        {
                            foreach (var sku in offer.Skus.List())
                            {
                                foreach (var image in sku.Images.List())
                                {
                                    if(limit == 6000) //12000 limit for Azure Rest, cont after 300secs
                                    {
                                        Thread.Sleep(300000);
                                        limit = 0;
                                    }

                                    limit++;

                                    //using space and remove "-" and underscores from sku name for easy searching
                                    string publisherWithoutHyphen = publisher.Name.Replace('-', ' ');
                                    string publisherWithoutHyphenUnderScore = publisherWithoutHyphen.Replace('_', ' ');
                                    string offerWithoutHyphen = offer.Name.Replace('-', ' ');
                                    string offerWithoutHyphenUnderScore = offerWithoutHyphen.Replace('_', ' ');
                                    string skuNameWithoutHyphen = sku.Name.Replace('-', ' ');
                                    string skuNameWithoutHyphenUnderScore = skuNameWithoutHyphen.Replace('_', ' ');
                                    
                                    string searchPattern = "";

                                    if(publisher.Name == "Canonical")
                                        searchPattern = "ubuntu";
                                    else if(publisher.Name == "SUSE")
                                        searchPattern = "suse";
                                    else if(publisher.Name == "RedHat")
                                        searchPattern = "redhat";
                                    else if(publisher.Name == "Debian")
                                        searchPattern = "debian";
                                    else if(publisher.Name == "Oracle")
                                        searchPattern = "debian";
                                    else if(publisher.Name == "MicrosoftWindowsServer")
                                        searchPattern = "microsoft windows server";
                                    else if(publisher.Name == "MicrosoftSQLServer")
                                        searchPattern = "microsoft sql server";
                                    else if(publisher.Name == "MicrosoftWindowsDesktop")
                                        searchPattern = "microsoft windows 10 desktop";
                                    else if(publisher.Name == "Oracle")
                                        searchPattern = "oracle";
                                    else if(publisher.Name == "MicrosoftSharePoint")
                                        searchPattern = "microsoft sharepoint";
                                    else if(publisher.Name == "MicrosoftVisualStudio")
                                        searchPattern = "visual studio";
                                    else if(publisher.Name == "MicrosoftDynamicsAX")
                                        searchPattern = "microsoft dynamics";
                                    else if(publisher.Name == "center-for-internet-security-inc")
                                        searchPattern = "cis";
                                    else if(publisher.Name == "paloaltonetworks")
                                        searchPattern = "palo alto";
                                    else if(publisher.Name == "checkpoint")
                                        searchPattern = "check checkpoint";
                                    else if(publisher.Name == "barracudanetworks")
                                        searchPattern = "barracuda";
                                            
                                    string displayName =
                                        offerWithoutHyphenUnderScore + " " + skuNameWithoutHyphenUnderScore;

                                    yield return new VMImage()
                                        {
                                            DisplayName = displayName,
                                            SearchPattern = searchPattern + " " + offer.Name + "_" + sku.Name,
                                            Publisher = publisher.Name,
                                            Offer = offer.Name,
                                            Sku = sku.Name,
                                            Version = image.Version
                                        };
                                }
                            }
                        }
                   }
            }
        }
        
        ServiceClientCredential sdkCred;
        AzureCredentials azureCreds;
        private Secret _secret;
        private ICacheRepository _cache;
        private Serilog.Core.Logger _logger;
    }
}
