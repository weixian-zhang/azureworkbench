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
using System.IdentityModel.Tokens.Jwt;
using AzW.Infrastructure;

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
            services.AddControllers();

            services.AddSwaggerGen();

            InitSecrets();

            ConfigureAzureAdAuth(services);

            ConfigureDependencies(services);

            //https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/wiki/How-ASP.NET-Core-uses-Microsoft.IdentityModel-extensions-for-.NET

            //https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-app-configuration
            
            
        }

        private void ConfigureAzureAdAuth(IServiceCollection services)
        {
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
                options.SaveToken = true;
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var jwtToken = context.SecurityToken as JwtSecurityToken;
                        string accessToken = jwtToken.RawData;

                        var ui = new UserIdentity()
                        {
                            AccessToken = accessToken
                        };

                        context.Principal.AddIdentity(ui);
                        

                        //log to DB signin info
                        // Add the access_token as a claim, as we may actually need it


                        // if (accessToken != null)
                        // {
                        //     ClaimsIdentity identity = context.Ticket.Principal.Identity as ClaimsIdentity;
                        //     if (identity != null)
                        //     {
                        //         identity.AddClaim(new Claim("access_token", accessToken.RawData));
                        //     }
                        // }

                        return Task.CompletedTask;
                    }
                };
                // Instead of using the default validation (validating against a single tenant,
                // as we do in line-of-business apps),
                // we inject our own multitenant validation logic (which even accepts both v1 and v2 tokens).
                //options.TokenValidationParameters.IssuerValidator = AadIssuerValidator.GetIssuerValidator(options.Authority).Validate;
            });
        }

        private void ConfigureDependencies(IServiceCollection services)
        {
            var apiSecret = new ApiSecret()
                    {
                        AzCosmonMongoConnectionString = _secrets.AzCosmonMongoConnectionString,
                        ClientId = _secrets.ClientId,
                        ClientSecret = _secrets.ClientSecret,
                        TenantId = _secrets.TenantId
                    };
            
            services.AddSingleton<ApiSecret>(sp => {return apiSecret ;} );

            // var _azSdkCred = new AzSDKCredentials
            //     (_secrets.AccessToken, _secrets.TenantId, _secrets.ClientId, _secrets.ClientSecret);

            // services.AddTransient<IAzArmService>(sp => {
            //     return new AzArmService(_azSdkCred);
            // });

            // services.AddTransient<IAzureInfoService>(sp => {
            //     return new AzureInfoService(new AzArmService(_azSdkCred));
            // });

        }

        private void InitSecrets()
        {
            _secrets = SecretManagerFactory.Create().GetSecret<ApiSecret>();
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

        private ApiSecret _secrets;
    }
}
