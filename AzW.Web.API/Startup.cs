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
using AzW.Infrastructure.Data;

namespace AzW.Web.API
{
    public class Startup
    {
        readonly string AllowAllOriginsPolicy = "_myAllowSpecificOrigins";

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
            // Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy(AllowAllOriginsPolicy, // I introduced a string constant just as a label "AllowAllOriginsPolicy"
                builder =>
                {
                    builder.AllowAnyOrigin();
                });
            });
 

            services.AddControllers();

            services.AddSwaggerGen();

            InitSecrets();

            ConfigureAzureAdAuth(services);

            ConfigureDependencies(services);
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

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();

            

            app.UseRouting();

            app.UseCors(AllowAllOriginsPolicy);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureAzureAdAuth(IServiceCollection services)
        {
            //services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
            services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)

            .AddAzureADBearer(options => {
                //https://docs.microsoft.com/bs-latn-ba/azure/active-directory/develop/scenario-protected-web-api-app-configuration
                options.Instance = "https://login.microsoftonline.com";
                options.TenantId = "common";
                options.ClientId = "16afdc21-ffd3-4cf8-aeae-63bebf9e327e"; //3b606e44-5ceb-4473-84c6-5f9b1119a2fc";
                //"3b606e44-5ceb-4473-84c6-5f9b1119a2fc";
            });
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

            services.Configure<JwtBearerOptions>(AzureADDefaults.JwtBearerAuthenticationScheme, options =>
            {
                // This is a Microsoft identity platform web API.
                options.Authority += "/v2.0";
                options.Audience = "16afdc21-ffd3-4cf8-aeae-63bebf9e327e"; //"";

                // The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
                options.TokenValidationParameters.ValidAudiences = new []
                {
                    options.Audience,
                    $"api://{options.Audience}"
                };

                options.SaveToken = true;
                options.TokenValidationParameters.ValidateLifetime = true;
                options.TokenValidationParameters.ValidateIssuer = false;
                options.TokenValidationParameters.SignatureValidator =
                    delegate(string token, TokenValidationParameters parameters)
                    {
                        var jwt = new JwtSecurityToken(token);

                        return jwt;
                    };
                
                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context => {
                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = failContext => {
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        var jwtToken = context.SecurityToken as JwtSecurityToken;
                        var ui = new UserIdentity();
                        ui.AccessToken = jwtToken.RawData;
                        ui.ValidFrom = jwtToken.ValidFrom;
                        ui.ValidTo = jwtToken.ValidTo;
                        foreach(var claim in jwtToken.Claims)
                        {
                            if(claim.Type == "upn")
                                ui.Email = claim.Value;
                            if(claim.Type == "aud")
                                ui.Audience = claim.Value;
                            if(claim.Type == "name")
                                ui.Name = claim.Value;
                            if(claim.Type == "ipaddr")
                                ui.ClientIP = claim.Value;
                        }

                        context.Principal.AddIdentity(ui);
                        
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
            services.AddSingleton<WorkbenchSecret>(sp => {return _secrets ;} );

            services.AddTransient<IDiagramLogic, DiagramLogic>();
            services.AddTransient<IDiagramRepository, DiagramRepository>();

        }

        private void InitSecrets()
        {
            _secrets = SecretManagerFactory.Create().GetSecret<WorkbenchSecret>();
        }

        private WorkbenchSecret _secrets;
    }
}