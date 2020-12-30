using System;
using System.Security.Claims;

namespace AzW.Web.API
{
    public class UserIdentity : ClaimsIdentity
    {
        public string AccessToken { get; set; }

        public string Audience { get; set; }

        public string AppId { get; set; }

        public string Name { get; set; }

        public DateTime IssuedAt { get; set; }
        
        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }


        public string Email { get; set; }

        public bool IsNewSignedUpUser { get; set; }

        public string Organization { get; set; }

        public string ClientIP { get; set; }
    }
}