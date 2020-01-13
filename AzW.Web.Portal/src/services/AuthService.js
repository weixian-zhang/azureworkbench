import { UserAgentApplication } from "msal";

export default class AuthService 
{
    constructor()
    {
        const isIE = () => {
            const ua = window.navigator.userAgent;
            const msie = ua.indexOf("MSIE ") > -1;
            const msie11 = ua.indexOf("Trident/") > -1;
          
            // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
            // const isEdge = ua.indexOf("Edge/") > -1;
          
            return msie || msie11;
        };

        this.msalApp = new UserAgentApplication({
            auth: {
              clientId: "16afdc21-ffd3-4cf8-aeae-63bebf9e327e",
              authority: "https://login.microsoftonline.com/common",
              validateAuthority: true,
              postLogoutRedirectUri: "http://localhost:3000",
              navigateToLoginRequestUrl: false
            },
            cache: {
              cacheLocation: "sessionStorage",
              storeAuthStateInCookie: isIE()
            },
            system: {
              navigateFrameWait: 0,
              logger: {
                error: console.error,
                errorPii: console.error,
                info: console.log,
                infoPii: console.log,
                verbose: console.log,
                verbosePii: console.log,
                warning: console.warn,
                warningPii: console.warn
              }
            },
            logger: {
              //https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-logging?tabs=dotnet
            }
          });
    }

    Login(loginResponseCallback) {
        const accessTokenRequest = {
            scopes: ["api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-portal-deploy"]
        }

        this.msalApp.acquireTokenPopup(accessTokenRequest).then(
            function(accessTokenResponse) {
            // Acquire token silent success
            // call API with token
            let accessToken = accessTokenResponse.accessToken;
            let account = accessTokenResponse.account;

            loginResponseCallback(accessTokenResponse);
             
        }).catch(function (error) {
            //Acquire token silent failure, send an interactive request.
            if (error.errorMessage.indexOf("interaction_required") !== -1) {
              this.msalApp.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
                    // Acquire token interactive success
                }).catch(function(error) {
                    // Acquire token interactive failure
                    console.log(error);
                });
            }
            console.log(error);
        });
    }

    Logout(){
        this.msalApp.logout();
    }

    IsUserLogin(){
        this.msalApp.acquireTokenSilent(this.applicationConfig.graphScopes).then(
            accessToken => {
              return true;
            },
            error => {
              return false;
            }
        
        )
    }
    
}