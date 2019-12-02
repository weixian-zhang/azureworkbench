import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css"; 
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./assets/css/index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Intent, Spinner } from "@blueprintjs/core";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner intent={Intent.PRIMARY} size={21} />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
document.getElementById("root"));