using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Serilog.Core;

namespace AzW.Web.API
{
       public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, Logger logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    
                    // context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    // context.Response.ContentType = "application/json";
 
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    
                    if(contextFeature != null)
                    { 
                        logger.Error($"Error occured, Message: {contextFeature.Error.Message} Stacktrace: {contextFeature.Error.StackTrace}");
                        // logger.LogError($"Something went wrong: {contextFeature.Error}");
 
                        // await context.Response.WriteAsync(new ErrorDetails()
                        // {
                        //     StatusCode = context.Response.StatusCode,
                        //     Message = "Internal Server Error."
                        // }.ToString());
                    }
                });
            });
        }
    }
}