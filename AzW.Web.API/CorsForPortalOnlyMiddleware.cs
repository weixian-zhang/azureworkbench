using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AzW.Web.API
{
    public class CorsForPortalOnlyMiddleware
    {
        private readonly RequestDelegate _next;

        public CorsForPortalOnlyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {
            httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
            httpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");
            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class CorsForPortalOnlyMiddlewareExtensions
    {
        public static IApplicationBuilder UseCorsForPortal(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CorsForPortalOnlyMiddleware>();
        }
    }
}