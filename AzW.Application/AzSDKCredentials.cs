using AzW.Secret;
using Microsoft.Identity.Client;
using Microsoft.Rest;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace AzW.Application
{
    public class AzSDKCredentials : ServiceClientCredentials
    {
        //for on-behalf-of oauth flow
        public AzSDKCredentials
            (string accessToken, string tenantId, string clientId, string clientSecret)
        {
            _delegatedUserContextAccessToken = accessToken;
            _tenantId = tenantId;
            _clientId = clientId;
            _clientSecret = clientSecret;
        }

        public string AccessToken { get { return AuthenticationToken; } }

        private string AuthenticationToken { get; set; }

        public override void InitializeServiceClient<T>(ServiceClient<T> client)
        {
            //https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/on-behalf-of

            IConfidentialClientApplication confiApp =
                ConfidentialClientApplicationBuilder.Create(_clientId)
                .WithClientSecret(_clientSecret)
                .Build();
            
            var userAssertion =
                new UserAssertion(_delegatedUserContextAccessToken, "urn:ietf:params:oauth:grant-type:jwt-bearer");
            
            IEnumerable<string> requestedScopes = new List<string>()
            {
                {"https://management.core.windows.net//.default"}
            };

            AuthenticationResult result = confiApp
                .AcquireTokenOnBehalfOf(requestedScopes, userAssertion)
                .ExecuteAsync()
                .GetAwaiter()
                .GetResult();

            if (result == null)
                throw new InvalidOperationException("Failed to obtain the JWT token");

            AuthenticationToken = result.AccessToken;
        }
        public override async Task ProcessHttpRequestAsync
            (HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }

            if (AuthenticationToken == null)
            {
                throw new InvalidOperationException("Access Token Cannot Be Null");
            }

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", AuthenticationToken);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            
            await base.ProcessHttpRequestAsync(request, cancellationToken);

        }
        private string _delegatedUserContextAccessToken;
        private string _tenantId;
        private string _clientId;
        private string _clientSecret;
    }
}
