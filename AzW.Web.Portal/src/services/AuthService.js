import { UserAgentApplication } from "msal";
import UserProfile from '../models/UserProfile';
import SessionStorage from './SessionStorage';
import Config from "../../src/config";
import Toast from '../components/Workbench/Helpers/Toast';
import moment from 'moment';

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
              postLogoutRedirectUri: Config.PortalUrl(),
              navigateToLoginRequestUrl: false
            },
            cache: {
              cacheLocation: "sessionStorage",
              storeAuthStateInCookie: isIE()
            }
          });
    }

    login = (callback) => {

        var thisComp = this;

        const loginRequest = {
            scopes: [Config.Scope()]
          }

        this.msalApp.loginPopup(loginRequest)
        .then(response => 
        {
            var userProfile = thisComp.aquireAccessTokenSilent(callback)
        })
        .catch(error => 
        {
          console.log(error);
            // handle error
        });
    }

    refreshAccessToken(callback) {
        this.aquireAccessTokenSilent(callback);
    }

    aquireAccessTokenSilent(callback) {

      var tokenRequest = {
        scopes: [Config.Scope()],
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

              if(callback != undefined)
              return callback(userProfile);
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

        if(userProfile == null || userProfile.AccessTokenExpiresOn == null)
          return true;

        var accessTokenExpireOn = new Date(userProfile.AccessTokenExpiresOn);
        var CurrentDate = new Date();
        if(accessTokenExpireOn < CurrentDate)
        {
            Toast.show('warning', 3000, "Session expired, logging out... Please login again.")
            this.logout();
        }
        else
            return false;
    } 
    
}