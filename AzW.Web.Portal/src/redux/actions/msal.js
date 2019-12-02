import { MSAL_LOGIN } from "./constants";
import msalApp from "../../services/msal";

// To implement
// export const MSAL_VERIFY_FAILED = "MSAL_VERIFY_FAILED";
// export const MSAL_VERIFY_SUCCESS = "MSAL_VERIFY_SUCCESS";

export function msalLogin() {
  return {
    type: MSAL_LOGIN
  };
}

export function msalLoginAsync() {
  return dispatch => {
    msalApp.loginRedirect({
      scopes: [
        "api://5700106c-06c4-4bde-ab79-b1dc3a255b85/AzResource.Deploy"
      ],
      // prompt: "select_account"
    });
    dispatch(msalLogin());
  };
}