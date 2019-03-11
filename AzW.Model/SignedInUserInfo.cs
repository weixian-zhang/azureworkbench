using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model
{
    public class SignedInUserInfo
    {
        public string UserPrincipalName { get; set; }

        public string GivenName { get; set; }

        public string FamilyName { get; set; }

        public DateTimeOffset? PasswordExpiresOn { get; set; }

        public string IdentityProvider { get; set; }
    }
}
