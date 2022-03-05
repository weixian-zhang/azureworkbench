// using AzW.Secret;
// using Microsoft.Identity.Client;
// using Microsoft.Rest;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Net.Http;
// using System.Net.Http.Headers;
// using System.Text;
// using System.Threading;
// using System.Threading.Tasks;


// namespace AzW.Infrastructure.AzureServices
// {
//     public class ServiceClientCredential : ServiceClientCredentials
//     {
//         //for on-behalf-of oauth flow
//         public ServiceClientCredential
//             (string tenantId, string clientId, string clientSecret)
//         {
//             _tenantId = tenantId;
//             _clientId = clientId;
//             _clientSecret = clientSecret; 
//         }

//         public string AccessToken { get { return _delegatedUserContextAccessToken; } }

//         private string AuthenticationToken { get; set; }

//         public override void InitializeServiceClient<T>(ServiceClient<T> client)
//         {
//             try
//             {
//                 AuthenticationToken = GetAccessToken().GetAwaiter().GetResult();
//             }
//             catch(Exception ex)
//             {
//                 throw ex;
//             }
//         }
//         public override async Task ProcessHttpRequestAsync
//             (HttpRequestMessage request, CancellationToken cancellationToken)
//         {
//             try
//             {

//                 if (request == null)
//                 {
//                     throw new ArgumentNullException("request");
//                 }

//                 if (AuthenticationToken == null)
//                 {
//                     AuthenticationToken = await GetAccessToken();
//                 }

//                 request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", AuthenticationToken);
//                 request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                
//                 await base.ProcessHttpRequestAsync(request, cancellationToken);
//             }
//             catch(Exception ex)
//             {
//                 throw ex;
//             }

//         }

//         private async Task<string> GetAccessToken()
//         {
//             //https://blogs.aaddevsup.xyz/2019/08/understanding-azure-ads-on-behalf-of-flow-aka-obo-flow/

//             try 
//             {

//                 IConfidentialClientApplication azwApi =
//                         ConfidentialClientApplicationBuilder.Create(_clientId)
//                         .WithClientSecret(_clientSecret)
//                         .WithTenantId(_tenantId)
//                         .Build();
            
             
//                 IEnumerable<string> requestedScopes = new List<string>()
//                 {
//                     {"https://management.azure.com/.default"}
//                 };

//                 AuthenticationResult result = azwApi
//                     .AcquireTokenForClient(requestedScopes)
//                     .ExecuteAsync()
//                     .GetAwaiter()
//                     .GetResult();
                
//                 return result.AccessToken;
//             }
//             catch(Exception ex)
//             {
//                 throw ex;
//             }
//         }
//         private string _delegatedUserContextAccessToken;
        
//         private string _tenantId;
//         public string TenantId {get {return _tenantId;}}

//         private string _clientId;
//         private string _clientSecret;
//     }
// }
