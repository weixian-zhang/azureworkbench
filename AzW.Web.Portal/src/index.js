import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Config from "../src/config";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css"; 
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./assets/css/index.css";
import "./assets/css/overlays.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Intent, Spinner } from "@blueprintjs/core";
import axios from 'axios';

//https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
axios.defaults.baseURL = Config.BaseAPIUrl();
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner intent={Intent.PRIMARY} size={21} />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
document.getElementById("root"));