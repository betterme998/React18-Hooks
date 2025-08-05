import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 使用react-redux的Provider来包裹App组件，并传入store
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
