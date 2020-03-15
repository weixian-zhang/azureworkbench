import { UserAgentApplication } from "msal";
import UserProfile from '../models/UserProfile';
import SessionStorage from './SessionStorage';
import Config from "../../src/config";

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
              clientId: Config.AADClientId(), 
              authority: Config.Authority(), 
              validateAuthority: true,
              postLogoutRedirectUri: Config.BaseAPIUrl(),
              navigateToLoginRequestUrl: false
            },
            cache: {
              cacheLocation: "sessionStorage",
              storeAuthStateInCookie: isIE()
            }
          });
    }

    login = (loginResponseCallback) => {

        const loginRequest = {
            scopes: [Config.Scope()] //["api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-azure-deploy"]
          }

        this.msalApp.loginPopup(loginRequest)
        .then(response => 
        {
            var tokenRequest = {
              scopes: [Config.Scope()],
              //scopes: ["api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/.default"],
              prompt: 'consent'
            };

            this.msalApp.acquireTokenSilent(tokenRequest)
            .then(response => 
            {
              var userProfile = new UserProfile();
              userProfile.TenantId = response.tenantId;
              userProfile.AccessToken = response.accessToken;
              userProfile.UserName = response.account.userName;
              userProfile.Name = response.account.name;
              userProfile.AccessTokenExpiresOn = response.expiresOn;
              userProfile.Environment = response.account.environment;

              SessionStorage.set(SessionStorage.KeyNames.UserProfile, JSON.stringify(userProfile));

              loginResponseCallback(userProfile);
            })
            .catch(error => {
                // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                if (error.name === "InteractionRequiredAuthError") {
                    return this.msalApp.acquireTokenPopup(tokenRequest)
                        .then(response => {
                            // get access token from response
                            // response.accessToken
                        })
                        .catch(err => {
                            // handle error
                        });
                }
            });
        })
        .catch(error => 
        {
          console.log(error);
            // handle error
        });
    }

    getUserProfile(){
      var userJsonStr = SessionStorage.get(SessionStorage.KeyNames.UserProfile);
      return JSON.parse(userJsonStr);
    }

    logout(){
        this.msalApp.logout();
        SessionStorage.remove(SessionStorage.KeyNames.UserProfile);
        document.cookie = "cookieName=; Path=/; domain=azureworkbench.com; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    isUserLogin(){
      if (this.msalApp.getAccount() == null || this.isSessionExpired())
        return false;
      else
        return true;
    }

    isSessionExpired() {
        var userProfile = this.getUserProfile();

        if(userProfile.AccessTokenExpiresOn == null)
          return true;

        var accessTokenExpireOn = userProfile.AccessTokenExpiresOn;
        var CurrentDate = new Date();
        if(accessTokenExpireOn < CurrentDate)
            return true;
        else
            return false;
    } 
    
}