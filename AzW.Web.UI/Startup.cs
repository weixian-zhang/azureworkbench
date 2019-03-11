using AutoMapper;
using AzW.Application;
using AzW.Designer;
using AzW.Model;
using AzW.Model.Designer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AzW.Web.UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            var builder = new ConfigurationBuilder();
        }

        public IConfiguration Configuration { get; }

        private SignInContext _signinContext;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            SetupAzureADAuthentication(services);

            services.AddAutoMapper();

            // Add framework services.
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            SetupDependencies(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Webpack initialization with hot-reload.
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        private void SetupAzureADAuthentication(IServiceCollection services)
        {
            //https://andrewlock.net/an-introduction-to-openid-connect-in-asp-net-core/

            //https://www.thomaslevesque.com/2018/12/24/multitenant-azure-ad-issuer-validation-in-asp-net-core/

            services.AddAuthentication(auth => { 
                auth.DefaultAuthenticateScheme = OpenIdConnectDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                auth.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                 })
                .AddCookie()
                .AddOpenIdConnect(options => {
                    //openid metadata issuer doesn't match /common or /organizations/v2.0"
                    //disable issuer validation
                    options.TokenValidationParameters.ValidateIssuer = false;

                    Configuration.GetSection("OpenIdConnect").Bind(options);

                    options.SaveTokens = true;

                    options.Events = new OpenIdConnectEvents()
                    {
                        OnAuthorizationCodeReceived = async ctx =>
                        {
                            var request = ctx.HttpContext.Request;
                            var currentUri = UriHelper.BuildAbsolute(request.Scheme, request.Host, request.PathBase, request.Path);
                            var credential = new ClientCredential(ctx.Options.ClientId, ctx.Options.ClientSecret);

                            var distributedCache = ctx.HttpContext.RequestServices.GetRequiredService<IDistributedCache>();

                            string userId =
                            ctx.Principal.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

                            //var cache = new AdalDistributedTokenCache(distributedCache, userId);

                            var authContext = new AuthenticationContext(ctx.Options.Authority, null);

                            var result = await authContext.AcquireTokenByAuthorizationCodeAsync(
                                ctx.ProtocolMessage.Code, new Uri(currentUri), credential, ctx.Options.Resource);

                            ctx.HandleCodeRedemption(result.AccessToken, result.IdToken);

                            ClaimsPrincipal principal = CreateSignInContext(Configuration, result, result.AccessToken);

                            ctx.HttpContext.User = principal;

                            //await ctx.HttpContext.SignInAsync("oidc", principal);

                            //ctx.Properties.StoreTokens()
                        }
                    };
                });
        }

        private ClaimsPrincipal CreateSignInContext
            (IConfiguration config, AuthenticationResult authResult, string accessToken)
        {
            this._signinContext = new SignInContext()
            {
                Tenant = authResult.TenantId,
                ClientId = config["OpenIdConnect:ClientId"],
                ClientSecret = config["OpenIdConnect:ClientSecret"],
                AccessToken = accessToken,
                UserInfo = new AzW.Model.SignedInUserInfo()
                {
                    UserPrincipalName = authResult.UserInfo.DisplayableId,
                    GivenName = authResult.UserInfo.GivenName,
                    FamilyName = authResult.UserInfo.FamilyName,
                    PasswordExpiresOn = authResult.UserInfo.PasswordExpiresOn,
                    IdentityProvider = authResult.UserInfo.IdentityProvider
                }
            };

            return this._signinContext;
        }

        private void SetupDependencies(IServiceCollection services)
        {
            services.AddSingleton<SignInContext>(s => { return this._signinContext; });

            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<IARMService, ARMService>();

            services.AddTransient<IARMManager>(a =>
                new ARMManager(
                    AzureHelper.CreateAzureClient(new AzureInitParameters()
                    {
                        AccessToken = this._signinContext.AccessToken,
                        TenantId = this._signinContext.Tenant
                    })));
        }
    }
}
