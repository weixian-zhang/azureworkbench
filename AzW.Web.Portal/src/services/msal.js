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
    clientId: "d77431ff-1996-404d-970c-adc2725d7e87",
    authority: "https://login.microsoftonline.com/fc418f16-5c93-437d-b743-05e9e2a04d93",
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
  else if (response) {
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

// msalApp.handleRedirectCallback(response => {
//   // console.log(response);
//   store.dispatch(msalLoginSuccess(response));
//   // store.dispatch({
//   //   type: MSAL_LOGIN_SUCCESS,
//   //   account: response
//   // })
// }, error => {
//   // console.log(error);
//   // console.log(response);
// });

export default msalApp;