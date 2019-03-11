using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("account")]
    public class AccountController : Controller
    {
        public AccountController(IHttpContextAccessor httpcontext)
        {
            //httpcontext.HttpContext.SignOutAsync(
        }

        [Route("signout")]
        public IActionResult SignOut()
        {
            return new SignOutResult(new[] { "oidc", "Cookies" });
        }
    }
}
