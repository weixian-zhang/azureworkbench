import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: "root",
  storage,
  // stateReconciler: hardSet,
  // transforms: [
  //   createBlacklistFilter("auth", []),
  // ]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);