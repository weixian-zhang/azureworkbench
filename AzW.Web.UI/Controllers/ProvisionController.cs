using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Model.Designer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("provisioner")]
    public class ProvisionController : Controller
    {
        public ProvisionController()
        {

        }

        [Route("deploy")]
        public void Provision(ProvisionContext provisionContext)
        {

        }
    }
}
