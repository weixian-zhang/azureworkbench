import { MSAL_LOGIN, MSAL_LOGOUT } from "./constants";
import msalApp from "../../services/msal";

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
      prompt: "select_account"
    });
    dispatch(msalLogin());
  };
}

export function msalLogout() {
  return {
    type: MSAL_LOGOUT
  };
}