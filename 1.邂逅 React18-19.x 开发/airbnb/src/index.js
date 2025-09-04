import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

// 需要将Provider组件包裹整个应用,并传入store，以便在任意组件中用useSelector等hook
import { Provider } from "react-redux";

import App from "@/App";
import "normalize.css";
import "@/assets/css/index.less";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* router是异步加载的，所以要使用Suspense组件 */}
    <Suspense fallback="loading">
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
