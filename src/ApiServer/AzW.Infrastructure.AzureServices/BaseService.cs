// using System.Collections.Generic;
// using System.Net.Http;
// using AzW.Secret;
// using Microsoft.Azure.Management.Fluent;
// using Microsoft.Azure.Management.ResourceManager.Fluent;
// using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
// using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
// using Microsoft.Identity.Client;
// using static Microsoft.Azure.Management.Fluent.Azure;

// namespace AzW.Infrastructure.AzureServices
// {
//     public abstract class BaseService
//     {
//         public BaseService(WorkbenchSecret secret)
//         {
//             Secret = secret;

//             var sdkCred =
//                 new ServiceClientOBOCredentials(secret.AccessToken, "common", secret.ClientId, secret.ClientSecret);

//             AzureCreds = new AzureCredentials
//                 (sdkCred, null, "common", AzureEnvironment.AzureGlobalCloud);

//             _azClient = Azure.Configure().Authenticate(AzureCreds);

//             _restClient = RestClient.Configure()
//             .WithEnvironment(AzureEnvironment.AzureGlobalCloud)
//             .WithCredentials(AzureCreds)
//             .Build();
//         }

//         protected AzureCredentials AzureCreds;
//         protected WorkbenchSecret Secret;
//         private RestClient _restClient;
//         public RestClient RestClient {get {return _restClient;}}

//         private IAuthenticated _azClient { get; set; }
//         public IAuthenticated AzClient { get {return _azClient;} }
//     }
// }