import React, { memo } from "react";
import { useRoutes } from "react-router";
import routes from "@/router";
import { AppBodyWrapper } from "./style";

const AppBody = memo(() => {
  return (
    <AppBodyWrapper className="AppBody">
      {/* 使用路由 */}
      {useRoutes(routes)}
    </AppBodyWrapper>
  );
});

export default AppBody;
