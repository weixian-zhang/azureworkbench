//import { UserAgentApplication } from "msal";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import UserProfile from '../models/UserProfile';
import SessionStorage from './SessionStorage';
import LocalStorage from './LocalStorage';
import Config from "../../src/config";
import LoginState from "./LoginState";
import Toast from '../components/Workbench/Helpers/Toast';


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

        // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
        this.loginRequest  = {
          scopes: Config.Scope()//["openid", "api://eclinic/desktop/Desktop.All"]
          //scopes: ["openid", "api://eclinic/desktop/Desktop.All"]
        };

        this.tokenRequest  = {
          scopes: Config.Scope(),//["api://eClinic/PatientRegistration/PC.All", "offline_access"],
          account: '',
          forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
        };

        this.msalConfig = {
          auth: {
            clientId:  Config.AADClientId(),
            authority: Config.Authority()
          },
          cache: {
            cacheLocation: "localStorage",//"sessionStorage", // This configures where your cache will be stored
            storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
          }
        };

        this.msalApp = new PublicClientApplication(this.msalConfig);
    }

    login = async () => {

      return new Promise((resolve, reject) => {

        var thisComp = this;

        this.tokenRequest.account = this.getMsalAccount();
  
        this.msalApp.acquireTokenSilent(this.tokenRequest)
          .then(tokenResponse => {

            var user = thisComp.createUser(tokenResponse);

            LoginState.onUserLoginStateChange(true);

            resolve(user);

          })
          .catch(error => {
  
            console.warn("silent token acquisition fails. acquiring token using popup");

            if (error.toString().includes("no_account_in_silent_request") || 
                error instanceof InteractionRequiredAuthError) {

                // fallback to interaction when silent call fails

                this.msalApp.acquireTokenPopup(thisComp.tokenRequest.account)
                    .then(tokenResponse => {

                      var user = thisComp.createUser(tokenResponse);

                      LoginState.onUserLoginStateChange(true);
                      
                      resolve(user);

                    }).catch(error => {
                        LoginState.onUserLoginStateChange(false);
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
        });

      });
    }

    createUser(tokenResponse) {
      var userProfile = new UserProfile();
      userProfile.Account= tokenResponse.account
      userProfile.TenantId = tokenResponse.tenantId;
      userProfile.UserName = tokenResponse.account.username;
      userProfile.Name = tokenResponse.account.name;
      userProfile.AccessTokenExpiresOn = tokenResponse.expiresOn;
      userProfile.Scopes = tokenResponse.scopes;
      userProfile.Issuer = tokenResponse.idTokenClaims.iss;
      userProfile.AccessToken = tokenResponse.accessToken;
      userProfile.IdToken = tokenResponse.idToken;

      LocalStorage.set(SessionStorage.KeyNames.UserProfile, JSON.stringify(userProfile));

      return userProfile;
    }

    getUserProfile(){
      var userJsonStr = LocalStorage.get(SessionStorage.KeyNames.UserProfile);
      return JSON.parse(userJsonStr);
    }

    isUserProfileExist(){
      var user = LocalStorage.get(SessionStorage.KeyNames.UserProfile);
      if(user == null || user == '')
        return false;
      else
        return true;
    }

    logout(){

        const logoutRequest = {
          account: this.getMsalAccount()
        };
  
        this.msalApp.logout(logoutRequest);

        LocalStorage.remove(SessionStorage.KeyNames.UserProfile);
        
        LoginState.onUserLoginStateChange(false);

        this.clearCookie();
    }

    isUserLogin = async () => {
      return new Promise(async (resolve, rej) => {

        var msalAcct = this.getMsalAccount();

        var result = await this.msalAquireTokenSilentFromCacheIsSuccess(msalAcct);
        
        LoginState.onUserLoginStateChange(result);

        resolve(result);
      });
    }

    async msalAquireTokenSilentFromCacheIsSuccess(account) {

      return new Promise((resolve, reject) => {

        this.tokenRequest.account = account;

        this.msalApp.acquireTokenSilent(this.tokenRequest)
        .then(tokenResponse => {

            //AAD 24hr refresh token is up, cannot extend anymore, full login required
            if(tokenResponse.extExpiresOn == null) {
                resolve(false);
                this.logout();
            }

            if(!tokenResponse.fromCache) {
              //refresh access token expiry at the same time and save to SessionStorage
              this.createUser(tokenResponse);
            }

            resolve(true);
        })
        .catch(error => {
          resolve(false);
        });

      });

    }

    getMsalAccount() {

      /**
       * See here for more info on account retrieval: 
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
       */
  
      const currentAccounts = this.msalApp.getAllAccounts();
      if (currentAccounts === null) {
          return null;
      } else if (currentAccounts.length > 1) {
          return currentAccounts[0];
          console.warn("Multiple accounts detected.");
      } else if (currentAccounts.length === 1) {
          return currentAccounts[0];
      }
  }

  async checkLoginStateAndNotify(){
    return new Promise(async (resolve, rej) => {
       var isLoggedIn = await this.isUserLogin();

       if(isLoggedIn) {
        resolve(true);
       } else {
        Toast.show("warning", 3000, "Please login to use this feature");
        resolve(false);
       }
    });
  }

  clearCookie() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }

    // checkTokenExpireAndRefreshToken = async () => {
    //   var userProfile = this.getUserProfile();
    //   var accessTokenExpireOn = new Date(userProfile.AccessTokenExpiresOn);
    //   var CurrentDate = new Date();
    //   if(accessTokenExpireOn < CurrentDate)
    //   {
    //       Toast.show("primary", 2500, "Refreshing login session...");

    //       await this.login(); // aquire token silent to refresh token without popup
    //   }
    // } 
    
}