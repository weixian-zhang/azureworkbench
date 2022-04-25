using Microsoft.ApplicationInsights.AspNetCore.TelemetryInitializers;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Http;
using AzW.Model;

namespace AzW.Web.API
{
    public class TelemetryUserNameEnrichment : TelemetryInitializerBase
    {
        public TelemetryUserNameEnrichment(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        protected override void OnInitializeTelemetry(HttpContext httpContext, RequestTelemetry requestTelemetry, ITelemetry telemetry)
        {
            UserIdentity user = GetUserIdentity(httpContext);
            
            if(user != null) {
                telemetry.Context.User.AuthenticatedUserId = user.Email;
                telemetry.Context.Session.Id = user.Email;
            }
        }

        private UserIdentity GetUserIdentity(HttpContext httpContext)
    {
        UserIdentity user = null;

        foreach(var identity in httpContext.User.Identities)
        {
            if(identity is UserIdentity)
            {
                user = (UserIdentity)identity;
                break;
            }
        }

        return user;
    }
    }
}