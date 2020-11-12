using AzW.Secret;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.API
{
    public class BaseController : Controller
    {
        protected UserIdentity GetUserIdentity()
        {
            if(User == null || User.Identities == null)
                return null;
            if(UserIdentity != null)
                return UserIdentity;

            foreach(var identity in User.Identities)
            {
                if(identity is UserIdentity)
                {
                    UserIdentity = (UserIdentity)identity;
                    break;
                }
            }

            return UserIdentity;
        }

        private UserIdentity UserIdentity;
    }
}