using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AzW.Infrastructure.Data;
using AzW.Model;
using AzW.Secret;
using Newtonsoft.Json;
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Rest;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Azure.Identity;
using Azure.Core;

namespace AzW.Job.CacheHydrator
{
    public class CacheHydrator
    {
        const string _RunEveryHourCron = "*/3 * * * * *";
        private static Microsoft.Azure.Management.Fluent.IAzure _azure;

        private static BlobManager _blobManager;

        private static WorkbenchSecret _secret;
        private static ICacheRepository _cache;
        private static Serilog.Core.Logger _logger;

        public CacheHydrator
            (WorkbenchSecret secret, ICacheRepository cache, Serilog.Core.Logger logger)
        {
            _secret = secret;
            _cache = cache;
            _logger = logger;

            _blobManager = new BlobManager(secret.StorageConnString);
        }

        [Function("CacheHydrator")]
        public async Task Run([Microsoft.Azure.Functions.Worker.TimerTrigger(_RunEveryHourCron)] TimerInfo myTimer, FunctionContext functionContext)
        {
            // var azureServiceTokenProvider = new AzureServiceTokenProvider("RunAs=App;");

            // string resource = @"https://management.azure.com/";
            // var accessToken = await azureServiceTokenProvider.GetAccessTokenAsync(resource).ConfigureAwait(false);

            var a = functionContext.Items;

            var defaultCredential = new DefaultAzureCredential();
            string accessToken = defaultCredential.GetToken(new TokenRequestContext(new[] { "https://management.azure.com/.default" })).Token;
            var defaultTokenCredentials = new Microsoft.Rest.TokenCredentials(accessToken);

            var azCred = new AzureCredentials
                (defaultTokenCredentials, null, _secret.TenantId, AzureEnvironment.AzureGlobalCloud);

           _azure = Microsoft.Azure.Management.Fluent.Azure
                .Configure()
                .Authenticate(azCred)
                .WithSubscription(_secret.SubscriptionId);

            _logger.Information("CacheHydrator started");

            await HydrateServiceTag();

            await HydrateVMSizes();

            await HydrateVMImages();

            _logger.Information("CacheHydrator completed");
        }
        public async Task HydrateVMSizes()
        {
            try
            {
                if(await _cache.IsVMSizeExistAsync())
                    return;

                _logger.Information("CacheHydrator-VMSize cache empty, start hydrating");

                //var azure = Microsoft.Azure.Management.Fluent.Azure.Configure().Authenticate(azureCreds);

                var vmSizes = await _azure.VirtualMachines.Sizes.ListByRegionAsync("southeastasia");

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

                _logger.Information("CacheHydrator-VMSize cache hydration completed");
            }
            catch(Exception ex)
            {
                _logger.Error(ex, ex.Message);
            }
        }

        private async Task HydrateServiceTag()
        {
            try
            {
                if(await _cache.IsServiceTagExistAsync())
                    return;

                _logger.Information("CacheHydrator-ServiceTag cache empty, start hydrating");

                string jsonSvcTags =
                    await _blobManager.GetServiceTagJsonFile(_secret.ServiceTagFileName);

                var svcTags = JsonConvert.DeserializeObject<DCIPServiceTags>(jsonSvcTags);

                foreach(var tag in svcTags.values)
                {
                    string cacheKey = "servicetag" + " " +  tag.id;
                    await _cache.SetServiceTagAsync(cacheKey, new ServiceTag()
                    {
                        Id = tag.id,
                        Name = tag.name
                    });
                }

                //set additional tags not in json file
                await _cache.SetServiceTagAsync
                        ("servicetag" + " " +  "AzurePlatformDNS", new ServiceTag()
                    {
                        Id = "AzurePlatformDNS",
                        Name = "AzurePlatformDNS"
                    });

                    await _cache.SetServiceTagAsync
                        ("servicetag" + " " +  "AzurePlatformIMDS", new ServiceTag()
                    {
                        Id = "AzurePlatformIMDS",
                        Name = "AzurePlatformIMDS"
                    });

                    await _cache.SetServiceTagAsync
                        ("servicetag" + " " +  "AzurePlatformLKM", new ServiceTag()
                    {
                        Id = "AzurePlatformLKM",
                        Name = "AzurePlatformLKM"
                    });


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

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureMonitor", new ServiceTag()
                    {
                        Id = "AzureMonitor",
                        Name = "AzureMonitor"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "Storage", new ServiceTag()
                    {
                        Id = "Storage",
                        Name = "Storage"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "GatewayManager", new ServiceTag()
                    {
                        Id = "GatewayManager",
                        Name = "GatewayManager"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AppServiceManagement", new ServiceTag()
                    {
                        Id = "AppServiceManagement",
                        Name = "AppServiceManagement"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AppService", new ServiceTag()
                    {
                        Id = "AppService",
                        Name = "AppService"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "SqlManagement", new ServiceTag()
                    {
                        Id = "SqlManagement",
                        Name = "SqlManagement"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureBackup", new ServiceTag()
                    {
                        Id = "AzureBackup",
                        Name = "AzureBackup"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "HDInsight", new ServiceTag()
                    {
                        Id = "HDInsight",
                        Name = "HDInsight"
                    });


                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureKeyVault", new ServiceTag()
                    {
                        Id = "AzureKeyVault",
                        Name = "AzureKeyVault"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "ApiManagement", new ServiceTag()
                    {
                        Id = "ApiManagement",
                        Name = "ApiManagement"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "GuestAndHybridManagement", new ServiceTag()
                    {
                        Id = "GuestAndHybridManagement",
                        Name = "GuestAndHybridManagement"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureIoTHub", new ServiceTag()
                    {
                        Id = "AzureIoTHub",
                        Name = "AzureIoTHub"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureEventGrid", new ServiceTag()
                    {
                        Id = "AzureEventGrid",
                        Name = "AzureEventGrid"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureSignalR", new ServiceTag()
                    {
                        Id = "AzureSignalR",
                        Name = "AzureSignalR"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureFrontDoor.Frontend", new ServiceTag()
                    {
                        Id = "AzureFrontDoor.Frontend",
                        Name = "AzureFrontDoor.Frontend"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureFrontDoor.Backend", new ServiceTag()
                    {
                        Id = "AzureFrontDoor.Backend",
                        Name = "AzureFrontDoor.Backend"
                    });

                   await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureFrontDoor.FirstParty", new ServiceTag()
                    {
                        Id = "AzureFrontDoor.FirstParty",
                        Name = "AzureFrontDoor.FirstParty"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureResourceManager", new ServiceTag()
                    {
                        Id = "AzureResourceManager",
                        Name = "AzureResourceManager"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureTrafficManager", new ServiceTag()
                    {
                        Id = "AzureTrafficManager",
                        Name = "AzureTrafficManager"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "ServiceFabric", new ServiceTag()
                    {
                        Id = "ServiceFabric",
                        Name = "ServiceFabric"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureDataLake", new ServiceTag()
                    {
                        Id = "AzureDataLake",
                        Name = "AzureDataLake"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "DataFactory", new ServiceTag()
                    {
                        Id = "DataFactory",
                        Name = "DataFactory"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureSiteRecovery", new ServiceTag()
                    {
                        Id = "AzureSiteRecovery",
                        Name = "AzureSiteRecovery"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzureCognitiveSearch", new ServiceTag()
                    {
                        Id = "AzureCognitiveSearch",
                        Name = "AzureCognitiveSearch"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AppConfiguration", new ServiceTag()
                    {
                        Id = "AppConfiguration",
                        Name = "AppConfiguration"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "AzurePortal", new ServiceTag()
                    {
                        Id = "AzurePortal",
                        Name = "AzurePortal"
                    });

                    await _cache.SetServiceTagAsync
                    ("servicetag" + " " +  "WindowsVirtualDesktop", new ServiceTag()
                    {
                        Id = "WindowsVirtualDesktop",
                        Name = "WindowsVirtualDesktop"
                    });

                _logger.Information("CacheHydrator-ServiceTag cache hydration completed");
            }
            catch(Exception ex)
            {
                _logger.Error(ex, ex.Message);
            }
        }

        private async Task HydrateVMImages()
        {
            try
            {
                if(!await _cache.IsVMImageCacheExistAsync())
                {
                    _logger.Information("CacheHydrator-VMImages cache empty, start hydrating");

                    foreach(var vmImg in GetImageReferences())
                    {
                        try
                        {
                            //await _cache.SetVMImageAsync(vmImg.SearchPattern, vmImg);
                        }
                        catch(Exception ex)
                        {
                            _logger.Error(ex, ex.Message);
                            continue;
                        }
                    }

                    _logger.Information("CacheHydrator-VMImages cache hydration completed");
                }
            }
            catch(Exception ex)
            {
                _logger.Error(ex, ex.Message);
            }
        }

        public IEnumerable<VMImage> GetImageReferences()
        {
            IEnumerable<IVirtualMachinePublisher> publishers = null;

            try
            {
                //var _azure = Microsoft.Azure.Management.Fluent.Azure.Configure().Authenticate(azureCreds);

                publishers = _azure.VirtualMachineImages.Publishers.ListByRegion(Region.AsiaSouthEast);
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
                                            SearcheableName = searchPattern + " " + offer.Name + "_" + sku.Name,
                                            Publisher = publisher.Name,
                                            Offer = offer.Name,
                                            Sku = sku.Name
                                        };
                                }
                            }
                        }
                   }
            }
        }
    }
}
