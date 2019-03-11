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
    public class UserLoggedInCredential : ServiceClientCredentials
    {
        public UserLoggedInCredential(string accessToken)
        {
            _accessToken = accessToken;
        }

        public override Task ProcessHttpRequestAsync
            (HttpRequestMessage request, CancellationToken cancellationToken)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return base.ProcessHttpRequestAsync(request, cancellationToken);
        }

        private string _accessToken;
    }
}
