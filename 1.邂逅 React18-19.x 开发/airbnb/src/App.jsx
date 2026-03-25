import React, { memo } from "react";
// import { useRoutes } from "react-router";
// import routes from "./router";
import AppHeader from "./components/app-header";
import AppBody from "./components/app-body";
import AppFooter from "./components/app-footer";

const App = memo(() => {
  return (
    <div className="app">
      <AppHeader />
      <AppBody />
      <AppFooter />
    </div>
  );
});

export default App;
