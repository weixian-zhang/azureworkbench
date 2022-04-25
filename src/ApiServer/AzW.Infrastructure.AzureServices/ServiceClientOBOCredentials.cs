// using AzW.Secret;
// using Microsoft.Identity.Client;
// using Microsoft.Rest;
// using System;
// using System.Collections.Generic;
// using System.Net.Http;
// using System.Net.Http.Headers;
// using System.Text;
// using System.Threading;
// using System.Threading.Tasks;


// namespace AzW.Infrastructure.AzureServices
// {
//     public class ServiceClientOBOCredentials : ServiceClientCredentials
//     {
//         //for on-behalf-of oauth flow
//         public ServiceClientOBOCredentials
//             (string accessToken, string tenantId, string clientId, string clientSecret)
//         {
//             _delegatedUserContextAccessToken = accessToken;
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
//                 //https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/on-behalf-of

//                 AuthenticationToken = GetAccessTokenOnbehalfFlow();
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
//                     AuthenticationToken = GetAccessTokenOnbehalfFlow();

//                     //throw new InvalidOperationException("Access Token Cannot Be Null");
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

//         private string GetAccessTokenOnbehalfFlow()
//         {
//             //https://blogs.aaddevsup.xyz/2019/08/understanding-azure-ads-on-behalf-of-flow-aka-obo-flow/

//             try 
//             {

//             IConfidentialClientApplication azwApi =
//                     ConfidentialClientApplicationBuilder.Create(_clientId)
//                     .WithClientSecret(_clientSecret)
//                     .WithTenantId("common")
//                     .Build();
                
//                 var userAssertion =
//                     new UserAssertion(_delegatedUserContextAccessToken,
//                     "urn:ietf:params:oauth:grant-type:jwt-bearer");
                
//                 IEnumerable<string> requestedScopes = new List<string>()
//                 {
//                     {"https://management.azure.com/.default"}
//                 };

//                 // AuthenticationResult result = azwApi
//                 //     .AcquireTokenForClient(requestedScopes)
//                 //     .ExecuteAsync()
//                 //     .GetAwaiter()
//                 //     .GetResult();

//                 AuthenticationResult result = azwApi
//                     .AcquireTokenOnBehalfOf(requestedScopes, userAssertion)
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
