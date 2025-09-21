import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

// 需要将Provider组件包裹整个应用,并传入store，以便在任意组件中用useSelector等hook
import { Provider } from "react-redux";

// 全局样式文件，使用ThemeProvider包裹整个应用,并传入主题对象
import { ThemeProvider } from "styled-components";

import App from "@/App";
import "normalize.css";
import "@/assets/css/index.less";
import store from "./store";
import theme from "./assets/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* router是异步加载的，所以要使用Suspense组件 */}
    <Suspense fallback="loading">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
