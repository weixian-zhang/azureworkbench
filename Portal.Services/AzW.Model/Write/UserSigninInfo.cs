using System;

namespace AzW.Model
{
    public class UserSigninInfo
    {
        public string Audience { get; set; }

        public string IdentityProvider { get; set; }

        public string TokenIssuer { get; set; }

        public string B2CUserFlowName { get; set; }

        public string Name { get; set; }

        public string GivenName { get; set; }

        public string FamilyName { get; set; }

        public DateTime TokenIssuedAt { get; set; }
        
        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }


        public string Email { get; set; }

        public bool IsNewSignedUpUser { get; set; }

        public string Organization { get; set; }

        public string ClientIP { get; set; }
    }
}