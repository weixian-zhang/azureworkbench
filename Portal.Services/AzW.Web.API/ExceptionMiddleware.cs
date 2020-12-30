using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Serilog.Core;

namespace AzW.Web.API
{
       public static class ExceptionMiddlewareExtensions
    {
        public async static void ConfigureExceptionHandler(this IApplicationBuilder app, Logger logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                { 
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    
                    if(contextFeature != null)
                    { 
                        logger.Error($"Error occured, Message: {contextFeature.Error.Message} Stacktrace: {contextFeature.Error.StackTrace}");
                    }
                });
            });
        }
    }
}