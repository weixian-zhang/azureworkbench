
using AzW.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace AzW.Web.UI.Controllers
{
    [Authorize]
    [Route("compute")]
    public class ComputeController : Controller
    {
        public ComputeController(IAzService azsvc)
        {
            _azsvc = azsvc;
        }

        private IAzService _azsvc;
    }
}
