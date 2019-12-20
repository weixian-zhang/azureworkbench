import { combineReducers } from "redux";
import msalReducer from "./msal";
import editorReducer from "./editor"

const rootReducer = combineReducers({
  msal: msalReducer,
  editor: editorReducer
});

export default rootReducer;