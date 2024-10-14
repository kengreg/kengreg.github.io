import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import "./index.scss";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then(
        (registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        },
        (error) => {
          console.error("Service Worker registration failed:", error);
        }
      );
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    rootElement
  );
} else {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    rootElement
  );
}
