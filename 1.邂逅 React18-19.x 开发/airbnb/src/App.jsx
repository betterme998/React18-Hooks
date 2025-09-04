import React, { memo } from "react";
import { useRoutes } from "react-router";
import routes from "./router";

const App = memo(() => {
  return (
    <div className="app">
      <div className="header"></div>
      <div className="page">
        {/* 使用路由 */}
        {useRoutes(routes)}
      </div>
      <div className="footer"></div>
    </div>
  );
});

export default App;
