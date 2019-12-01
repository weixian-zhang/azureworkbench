using System.Security.Claims;

namespace AzW.Web.API
{
    public class UserIdentity : ClaimsIdentity
    {
        public string AccessToken { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string ClientIP { get; set; }
    }
}