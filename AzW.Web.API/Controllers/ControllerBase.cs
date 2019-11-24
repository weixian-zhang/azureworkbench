using System;
using System.Net.Http;
using AzW.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AzW.Web.API
{
    public class BaseController : Controller
    {
        public BaseController(WorkbenchSecret secrets)
        {
            Secrets = secrets;
        }

        protected IAzService GetAzService()
        {
            string accessToken = Request.Headers["Authorization"];
            Secrets.AccessToken = accessToken;

            IAzService azSvc = AzureFactory.AuthAndCreateInstance
                (Secrets.AccessToken, Secrets.TenantId, Secrets.ClientId, Secrets.ClientSecret);
            
            return azSvc;
        }

        protected WorkbenchSecret Secrets;
    }
}