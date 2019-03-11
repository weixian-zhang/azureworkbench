using System;
using System.Security.Claims;

namespace AzW.Model
{
    public class SignInContext : ClaimsPrincipal
    {
        public string Tenant { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }

        public string AccessToken { get; set; }

        public SignedInUserInfo UserInfo { get; set; }
    }
}
