export default class Config
{
    constructor(){
    }

    static BaseAPIUrl() {
        if(process.env.REACT_APP_ENV == 'local')
            return  'http://localhost:8089';
        else if(process.env.REACT_APP_ENV == 'beta') 
            return 'https://beta-api.azureworkbench.com';
        else if(process.env.REACT_APP_ENV == 'prod')
            return 'https://api.azureworkbench.com';
        else
            return  'http://localhost:8089';
     }
     static PortalUrl() {
        if(process.env.REACT_APP_ENV == 'local')
            return  'http://localhost:3000';
        else if(process.env.REACT_APP_ENV == 'beta')
            return 'https://beta.azureworkbench.com';
        else if(process.env.REACT_APP_ENV == 'prod')
            return 'https://www.azureworkbench.com';
        else
            return 'http://localhost:3000';
     }
    static AADClientId() {return '4a2a5dad-0bdd-453a-84b1-b83d50878ba9';}
    static AADAuthority() {return 'https://login.microsoftonline.com/common'; }
    static AADKnownAuthorities() {return ["login.microsoftonline.com", "wxzoss.b2clogin.com"]; }
    static AADScope() {
        return [
            "openid",
            "offline_access",
            "api://azworkbench-pkce/Read.Write.AzureSubscription"
        ];
     }

     
     static B2CClientId() {return 'bc98a1a6-1e4f-42fc-9021-a6c5b8540fa7';}
     static B2CAuthoritySignin() {return 'https://wxzoss.b2clogin.com/wxzoss.onmicrosoft.com/B2C_1_userflow_signin'; }
     static B2CAuthorityPasswordReset() {return 'https://wxzoss.b2clogin.com/wxzoss.onmicrosoft.com/B2C_1_userflow_passwordreset'; }
     static B2CKnownAuthorities() {return ["login.microsoftonline.com", "wxzoss.b2clogin.com"]; } //
     static B2CScope() {
        return [
            "openid",
            "profile",
            "offline_access",
            "https://wxzoss.onmicrosoft.com/bc98a1a6-1e4f-42fc-9021-a6c5b8540fa7/MySpace.RW",
        ];
    }
}