import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/sb-admin-2.css";
import "./assets/css/style.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ErrorHandler } from "./components/ErrorHandler";

ReactDOM.render(
  <Provider store={store} key="provider">
    <ErrorHandler>
      <App />
    </ErrorHandler>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
