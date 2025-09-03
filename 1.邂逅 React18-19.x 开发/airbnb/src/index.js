import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

import App from "@/App";
import "normalize.css";
import "@/assets/css/index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
