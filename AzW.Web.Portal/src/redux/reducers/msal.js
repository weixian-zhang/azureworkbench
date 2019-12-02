import { 
  MSAL_LOGIN_SUCCESS,
  MSAL_LOGIN_FAILED,
  MSAL_LOGOUT
} from "../actions"

const initialState = {
  account: null,
  error: null
}

export default function msalReducer(state=initialState, action) {
  switch (action.type) {

    case MSAL_LOGIN_SUCCESS:
      return {
        ...state,
        account: action.account,
        error: null
      };

    case MSAL_LOGIN_FAILED:
      return {
        ...state,
        account: null,
        error: action.error
      };

    case MSAL_LOGOUT:
      return {
        ...state,
        account: null
      };

    default:
      return state;

  }
}