import { UserAgentApplication } from "msal";
import { store } from "../redux/store";
import { MSAL_LOGIN_SUCCESS, MSAL_LOGIN_FAILED } from "../redux/actions";

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

const msalApp = new UserAgentApplication({
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

function msalLoginSuccess(account) {
  return {
    type: MSAL_LOGIN_SUCCESS,
    account
  }
}

function msalLoginError(error) {
  return {
    type: MSAL_LOGIN_FAILED,
    error: error
  };
}

msalApp.handleRedirectCallback(async (error, response) => {
  if (error) {
    store.dispatch(msalLoginError(error));
  }
  else if (response) 
  {
    // Temporary workaround for MSAL and persistent storage
    // MSAL redirects back to our SPA and this immediately fires the callback
    // but our persistent storage overwrites this afterwards, so the user never
    // logs in. With 1 ms delay this will overwrite the existing storage
    // Supposedly the persistent storage will merge incoming dispatchs but
    // it was not working when I tested. => store.js => stateReconciler: hardSet
    setTimeout(function() {
      store.dispatch(msalLoginSuccess(response));
    }, 1);
  }
});

export default msalApp;