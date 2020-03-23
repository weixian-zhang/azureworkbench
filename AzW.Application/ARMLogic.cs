// using System.Collections.Generic;
// using System.Threading.Tasks;
// using AzW.Infrastructure;
// using AzW.Infrastructure.AzureServices;
// using AzW.Model;
// using AzW.Secret;
// using Microsoft.Azure.Management.Fluent;
// using Microsoft.Azure.Management.ResourceManager.Fluent;
// using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
// using Microsoft.Azure.Management.ResourceManager.Models;
// using static Microsoft.Azure.Management.Fluent.Azure;

// namespace AzW.Application
// {
//     public class ARMLogic : IAzureInfoService
//     {
//         public ARMLogic(AzSDKCredentials azSdkCred, WorkbenchSecret secret)
//         {
//             _azSdkCred = azSdkCred;
//             _secret = secret;
//         }

//         public Task<IEnumerable<AzLocation>> GetLocations()
//         {
//             throw new System.NotImplementedException();
//         }

//         public Task<IEnumerable<AzResourceGroup>> GetResourceGroups()
//         {
//             throw new System.NotImplementedException();
//         }

//         public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
//         {
//            //var subs = await _azRscManager.GetSubscriptions();

//            var azureCreds = new AzureCredentials
//                 (_azSdkCred, _azSdkCred, _secret.TenantId, AzureEnvironment.AzureGlobalCloud);

//             IAuthenticated azAuthClient = Azure.Configure().Authenticate(azureCreds);
//             var subs = await azAuthClient.WithDefaultSubscription().Subscriptions.ListAsync();

//            var azSubs = ObjectMapper.Mapper.Map
//             <IEnumerable<ISubscription>, IEnumerable<AzSubscription>>(subs);

//             return azSubs;
//         }

//         private AzSDKCredentials _azSdkCred;
//         private WorkbenchSecret _secret;
//     }
// }