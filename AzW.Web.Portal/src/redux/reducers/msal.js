import { 
  MSAL_LOGIN,
  MSAL_LOGIN_SUCCESS,
  MSAL_LOGIN_FAILED,
  MSAL_LOGOUT
} from "../actions"

const initialState = {
  isLoginInProcess: false,
  account: null,
  error: null
}

export default function msalReducer(state=initialState, action) {
  switch (action.type) {

    case MSAL_LOGIN:
      return {
        ...state,
        isLoginInProcess: true
      }

    case MSAL_LOGIN_SUCCESS:
      return {
        ...state,
        account: action.account,
        isLoginInProcess: false,
        error: null
      };

    case MSAL_LOGIN_FAILED:
      return {
        ...state,
        account: null,
        isLoginInProcess: false,
        error: action.error
      };

    case MSAL_LOGOUT:
      return {
        ...state,
        isLoginInProcess: false,
        account: null
      };

    default:
      return state;

  }
}