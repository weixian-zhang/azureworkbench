using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzW.Secret;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AzW.Application;

namespace AzW.Web.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
        
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            InitSecrets();

            services.AddControllers();

            services.AddSwaggerGen();
            
            services.AddSingleton<WorkbenchSecret>(sp => {return _secrets; });

            //https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/wiki/How-ASP.NET-Core-uses-Microsoft.IdentityModel-extensions-for-.NET

            //https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-app-configuration
            
            services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
            .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));
            
            services.Configure<JwtBearerOptions>(AzureADDefaults.JwtBearerAuthenticationScheme, options =>
            {
                // This is a Microsoft identity platform web API.
                options.Authority += "/v2.0";

                // The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
                options.TokenValidationParameters.ValidAudiences = new []
                {
                    options.Audience,
                    $"api://{options.Audience}"
                };
            
            options.TokenValidationParameters.ValidateIssuer = false;


                // Instead of using the default validation (validating against a single tenant,
                // as we do in line-of-business apps),
                // we inject our own multitenant validation logic (which even accepts both v1 and v2 tokens).
                //options.TokenValidationParameters.IssuerValidator = AadIssuerValidator.GetIssuerValidator(options.Authority).Validate;
            });
            
            
            
            // .AddJwtBearer(opt => {
            //     opt.SaveToken = true;
            //     opt.MetadataAddress = "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration";
            //     opt.Audience = azadOptions.ClientId;
            //     opt.Authority = "https://login.microsoftonline.com/common/v2.0";
            //     opt.TokenValidationParameters.ValidateIssuer = false;
            //     opt.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey
            //                  (Encoding.ASCII.GetBytes(""));

                // opt.TokenValidationParameters.   = new TokenValidationParameters
                //     {
                //         RequireSignedTokens = false,
                //         ValidateIssuerSigningKey = false,
                //         ValidateLifetime = true,
                //         ValidateAudience = false,
                //         ValidateIssuer = false,
                //         IssuerSigningKey = new SymmetricSecurityKey
                //             (Encoding.ASCII.GetBytes(azadOptions.ClientSecret)),
                //         ValidAudiences = new List<string>
                //         {
                //             azadOptions.ClientId
                //         },
                //     } ;
                
                // opt.Events = new JwtBearerEvents()
                // {
                //     OnTokenValidated = context =>
                //             {
                //                 Console.WriteLine("OnTokenValidated: " + 
                //                     context.SecurityToken);
                //                 return Task.CompletedTask;
                //             },
                    
                //     OnAuthenticationFailed = context => 
                //     {
                        
                //         return null;
                //     }
                    
                // };
            //});

            // ISecretManager secretManager = SecretManagerFactory.Create();
            // services.AddSingleton<ISecretManager>(secretManager);

//             services.AddScoped<IReportService>(provider => {
//     var httpContext = provider.GetRequired<IHttpContextAccessor>().HttpContext;

//     if(httpContext.User.IsAuthorized) 
//     {
//         return new AuthorizedUserReportService(...);
//         // or resolve it provider.GetService<AuthorizedUserReportService>()
//     }

//     return new AnonymousUserReportService(...);
//     // or resolve it provider.GetService<AnonymousUserReportService>()
// });
        }

        private void InitSecrets()
        {
            _secrets = SecretManagerFactory.Create().GetSecret<WorkbenchSecret>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseSwagger();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            
        }

        private WorkbenchSecret _secrets;
    }
}
