import { combineReducers } from 'redux';
import msalReducer from './msal';
import graphReducer from './graphReducer';

const rootReducer = combineReducers({
  msal: msalReducer,
  graph: graphReducer
});

export default rootReducer;