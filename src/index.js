import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/scss/paper-kit.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
