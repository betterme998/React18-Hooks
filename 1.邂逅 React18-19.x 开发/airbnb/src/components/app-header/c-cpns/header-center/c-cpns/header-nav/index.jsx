import React, { memo, useCallback } from "react";

// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeTabsKey } from "@/store/modules/header";

import { NavWrapper } from "./style";
import { Tabs } from "antd";

import NavIcon from "@/assets/video/nav-icon"; //自己写的icon组件
import navIconConfig from "./config/navIcon.config"; //控制icon照片视频配置文件

const HeaderNav = memo(() => {
  const onChange = useCallback((newActiveKey) => {
    // setActiveKey((newActiveKey) => newActiveKey);
    console.log(newActiveKey);
  }, []);
  // const onChange = (newActiveKey) => {
  //   console.log(newActiveKey);

  //   setActiveKey(newActiveKey);
  // };
  return (
    <NavWrapper>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={navIconConfig.map(({ poster, videoSrc, key }, i) => {
            const id = String(i + 1);
            console.log(123);

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
// 参数一
const mapStateToProps = (state) => ({
  tabsKey: state.header.tabsKey,
});

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeTabsKey: (key) => {
    dispatch(changeTabsKey(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
