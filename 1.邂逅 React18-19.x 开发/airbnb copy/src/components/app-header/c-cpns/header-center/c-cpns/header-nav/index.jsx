import React, { memo, useCallback, useRef, useState } from "react";

// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeTabsKey } from "@/store/modules/header";

import { NavWrapper } from "./style";
import { Tabs } from "antd";

import NavIcon from "@/assets/video/nav-icon"; //自己写的icon组件
import navIconConfig from "./config/navIcon.config"; //控制icon照片视频配置文件

const HeaderNav = memo(({ tabsKey, changeTabsKey }) => {
  const [activeKey, setActiveKey] = useState("1"); //当前激活的标签页
  const [previousKey, setPreviousKey] = useState(null); //之前激活的标签页
  const iconRefs = useRef({}); //存储所有图标ref的对象
  const currentIconRef = useRef(null); //当前激活图标的ref
  const [iconState, setIconStatus] = useState({}); //所有图标的状态

  // 注册ref - 将每个图标的ref存储到iconRefs中
  const registerRef = useCallback((key, ref) => {
    if (ref) {
      iconRefs.current[key] = ref;
    }
  }, []);

  // Tab切换处理函数
  const handleTabChange = (key) => {
    // 保存之前的active key
    setPreviousKey(activeKey);

    // 取消之前激活的图标状态
    if (activeKey && iconRefs.current[activeKey]) {
      iconRefs.current[activeKey].deactivate();
    }

    // 设置新的action key
  };

  const videoRef = useRef(null);
  const onChange = useCallback(
    (newActiveKey) => {
      // 触发 actions 来更新 Redux store 中的状态

      changeTabsKey(newActiveKey);
      console.log(videoRef);

      videoRef.current?.play().catch((error) => {
        console.error("自动播放失败:", error);
      });
      // console.log("tabs:", newActiveKey);
    },
    [changeTabsKey]
  );

  return (
    <NavWrapper>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabsKey}
        onChange={onChange}
        items={navIconConfig.map(({ poster, videoSrc, key }, i) => {
          const id = String(i + 1);
          console.log(tabsKey === id);

          return {
            key: id,
            label: `Tab ${id}`,
            icon: (
              <NavIcon
                ref={tabsKey === id ? videoRef : null}
                poster={poster}
                videoSrc={videoSrc}
              />
            ),
          };
        })}
      />
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
