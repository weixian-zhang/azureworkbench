import { combineReducers } from 'redux';
import msalReducer from './msal';

const rootReducer = combineReducers({
  msal: msalReducer
});

export default rootReducer;