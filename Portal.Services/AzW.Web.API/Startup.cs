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
using System.IdentityModel.Tokens.Jwt;
using AzW.Infrastructure;
using AzW.Infrastructure.Data;
using Serilog;
using Serilog.Core;
using Serilog.Sinks.ApplicationInsights.Sinks.ApplicationInsights.TelemetryConverters;
using System.Reflection;
using System.IO;
using Serilog.Events;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.ApplicationInsights.Extensibility;
using AzW.Model;
using AzW.Infrastructure.AzureServices;

namespace AzW.Web.API
{
    public class Startup
    {
        readonly string AllowAllOriginsPolicy = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
              var configBuilder = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .AddUserSecrets("7211aa50-115d-4544-9cf0-c4499c5f2e9f");

            Configuration = configBuilder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy(AllowAllOriginsPolicy,
                builder =>
                {
                     builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            services.AddControllers();

            services.AddSwaggerGen();

            InitSecrets();

            InitSerilog();

            ConfigureAzureAdAuth(services);

            ConfigureDependencies(services);

            //init cache on HostBoot
            services.AddHostedService<HostBoot>();

            //app insights user tracker
            services.AddApplicationInsightsTelemetry(_secrets.AppInsightsKey);
            services.AddSingleton<ITelemetryInitializer, TelemetryUserNameEnrichment>();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            _webenv = env;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(AllowAllOriginsPolicy);

            app.UseAuthentication();

            app.UseSwagger();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseExceptionHandler(handler => {

                handler.Run(async context =>
                {
                    var exceptionHandlerPathFeature =
                        context.Features.Get<IExceptionHandlerPathFeature>();

                    _logger.Error
                        (exceptionHandlerPathFeature.Error, exceptionHandlerPathFeature.Error.Message);
                });
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureAzureAdAuth(IServiceCollection services)
        {
            services
                .AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
                .AddAzureADBearer(options => {

                    //https://docs.microsoft.com/bs-latn-ba/azure/active-directory/develop/scenario-protected-web-api-app-configuration
                    options.Instance = "https://login.microsoftonline.com";
                    options.TenantId = "common";
                    options.ClientId = "4a2a5dad-0bdd-453a-84b1-b83d50878ba9";
                    Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
                });

            services.Configure<JwtBearerOptions>
                (AzureADDefaults.JwtBearerAuthenticationScheme, options =>
                    {
                        // This is a Microsoft identity platform web API.
                        options.Authority += "/v2.0";
                        //options.Audience = "16afdc21-ffd3-4cf8-aeae-63bebf9e327e";

                        // The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
                        options.TokenValidationParameters.ValidAudiences = new []
                        {
                            options.Audience, //azworkbench-portal-dev
                            $"api://{options.Audience}",
                            "00000003-0000-0000-c000-000000000000",//graph api
                            "4a2a5dad-0bdd-453a-84b1-b83d50878ba9", //azworkbench-portal-dev-pkce
                            "api://azworkbench-pkce", //azworkbench-portal-dev-pkce
                            "bc98a1a6-1e4f-42fc-9021-a6c5b8540fa7" //B2C Azure Workbench app
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
                            OnMessageReceived= context => {
                                return Task.CompletedTask;
                            },
                            OnChallenge = context => {
                                return Task.CompletedTask;
                            },
                            OnAuthenticationFailed = failContext => {
                                return Task.CompletedTask;
                            },
                            OnTokenValidated = context =>
                            {
                                var jwtToken = context.SecurityToken as JwtSecurityToken;

                                var ui = CreateUserIdentityFromJwt(jwtToken);

                                context.Principal.AddIdentity(ui);

                                return Task.CompletedTask;
                            }
                        };
                    });
    }


        private void ConfigureDependencies(IServiceCollection services)
        {
            services.AddSingleton<WorkbenchSecret>(sp => {return _secrets ;} );

            services.AddSingleton<BlobStorageManager>(sp => {
                return new BlobStorageManager(_secrets.AzBlobConnString);
            });

            services.AddSingleton<ITemplateGenerator, BicepGenerator>();

            services.AddSingleton<Logger>(sp => {return _logger ;} );
            services.AddTransient<IDiagramRepository, DiagramRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ICacheRepository>(x => {
                return new CacheRepository
                    (_secrets.RedisConnString, _secrets.RedisHost, _secrets.RedisPassword);
            });
        }

        private UserIdentity CreateUserIdentityFromJwt(JwtSecurityToken jwtToken)
        {
            var ui = new UserIdentity();
            ui.AccessToken = jwtToken.RawData;
            ui.ValidFrom = jwtToken.ValidFrom;
            ui.ValidTo = jwtToken.ValidTo;
            foreach(var claim in jwtToken.Claims)
            {
                if(claim.Type == "upn") //aad
                    ui.Email = claim.Value;

                if (claim.Type == "emails") //b2c
                    ui.Email = claim.Value;

                if(claim.Type == "newUser") //b2c
                    ui.IsNewSignedUpUser = Convert.ToBoolean(claim.Value);

                if(claim.Type == "extension_Organization") //b2c
                    ui.Organization = claim.Value;

                if(claim.Type == "given_name") {
                    ui.Name = claim.Value;
                    ui.GivenName = claim.Value;
                }

                if(claim.Type == "family_name") {
                    ui.FamilyName = claim.Value;
                }

                if(claim.Type == "family_name" && !string.IsNullOrEmpty(ui.Name))
                    ui.Name += " " + claim.Value;

                if(claim.Type == "idp")
                    ui.IdentityProvider = claim.Value;


                if(claim.Type == "aud")
                    ui.Audience = claim.Value;

                if(claim.Type == "iss")
                    ui.TokenIssuer = claim.Value;

                if(claim.Type == "tfp")
                    ui.B2CUserFlowName = claim.Value;

                if(claim.Type == "name")
                    ui.Name = claim.Value;

                if(claim.Type == "ipaddr")
                    ui.ClientIP = claim.Value;
            }

            return ui;
        }

        private void InitSecrets()
        {
            _secrets = new WorkbenchSecret(){
                ClientId = Configuration.GetValue<string>("ClientId"),
                ClientSecret = Configuration.GetValue<string>("ClientSecret"),
                AzCosmonMongoConnectionString =
                    Configuration.GetValue<string>("AzCosmonMongoConnectionString"),
                AzBlobConnString =
                    Configuration.GetValue<string>("AzBlobConnString"),
                PortalUrl = Configuration.GetValue<string>("PortalUrl"),
                TenantId = Configuration.GetValue<string>("TenantId"),
                AppInsightsKey = Configuration.GetValue<string>("AppInsightsKey"),
                LibwkhtmltoxPath = Configuration.GetValue<string>("LibwkhtmltoxPath"),
                RedisConnString = Configuration.GetValue<string>("RedisConnString"),
                RedisHost = Configuration.GetValue<string>("RedisHost"),
                RedisPassword = Configuration.GetValue<string>("RedisPassword")
            };
        }

        private void InitSerilog()
        {
            _logger = new LoggerConfiguration()
                .WriteTo
                .MongoDB(
                    CosmosDbHelper.GetDatabase(_secrets),
                    LogEventLevel.Debug,
                    collectionName: "Log-API",
                    period: TimeSpan.Zero)
                    .WriteTo
                        .ApplicationInsights(new TelemetryConfiguration(){
                            InstrumentationKey = _secrets.AppInsightsKey
                        }, new TraceTelemetryConverter())
                .CreateLogger();
        }

        private WorkbenchSecret _secrets;
        private Logger _logger;
        private IWebHostEnvironment _webenv;
    }
}