import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css"; 
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./css/index.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById("root"));