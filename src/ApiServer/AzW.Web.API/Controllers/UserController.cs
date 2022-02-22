using System.Threading.Tasks;
using AzW.Infrastructure.Data;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog.Core;

namespace AzW.Web.API
{
    [Route("api")]
    public class UserController : BaseController
    {
        public UserController
            (IUserRepository repo, WorkbenchSecret secret)
        {
            _userrepo = repo;
            _secret = secret;
        }

        [Authorize()]
        [HttpPost("user/signin/log")]
        public async Task LogUserSignin() 
        {
            var ui = this.GetUserIdentity();

            var signininfo = ObjectMapper.Mapper.Map<UserIdentity, UserSigninInfo>(ui);

            await _userrepo.LogUserSignin(signininfo);
        }

        private IUserRepository _userrepo;
        private WorkbenchSecret _secret;
    }
}