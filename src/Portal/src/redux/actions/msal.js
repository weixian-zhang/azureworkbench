import { MSAL_LOGIN, MSAL_LOGOUT } from "./constants";
import msalApp from "../../services/msal";

export function msalLogin() {
  return {
    type: MSAL_LOGIN
  };
}

export function msalLoginAsync() {
  return dispatch => {
    
    // msalApp.loginRedirect({
    //   scopes: [
    //     "api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-portal-deploy"
    //   ],
    //   prompt: "select_account"
    // });

    const accessTokenRequest = {
      scopes: ["api://16afdc21-ffd3-4cf8-aeae-63bebf9e327e/azworkbench-portal-deploy"]
  }

    msalApp.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
      // Acquire token silent success
      // call API with token
      let accessToken = accessTokenResponse.accessToken;
      let account = accessTokenResponse.account;
       
  }).catch(function (error) {
      //Acquire token silent failure, send an interactive request.
      if (error.errorMessage.indexOf("interaction_required") !== -1) {
        msalApp.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
              // Acquire token interactive success
          }).catch(function(error) {
              // Acquire token interactive failure
              console.log(error);
          });
      }
      console.log(error);
  });



    dispatch(msalLogin());
  };
}

export function msalLogout() {
  return {
    type: MSAL_LOGOUT
  };
}