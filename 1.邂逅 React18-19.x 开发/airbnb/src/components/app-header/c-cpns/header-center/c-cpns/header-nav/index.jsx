import React, { memo } from "react";
import { NavWrapper } from "./style";
import { Tabs } from "antd";

import NavIcon from "@/assets/video/nav-icon"; //自己写的icon组件
import navIconConfig from "./config/navIcon.config"; //控制icon照片视频配置文件

const HeaderNav = memo(() => {
  return (
    <NavWrapper>
      <div>
        <Tabs
          defaultActiveKey="1"
          items={navIconConfig.map(({ poster, videoSrc }, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: `Tab ${id}`,
              children: `Tab ${id}`,
              icon: <NavIcon poster={poster} videoSrc={videoSrc} />,
            };
          })}
        />
      </div>
    </NavWrapper>
  );
});

export default HeaderNav;
