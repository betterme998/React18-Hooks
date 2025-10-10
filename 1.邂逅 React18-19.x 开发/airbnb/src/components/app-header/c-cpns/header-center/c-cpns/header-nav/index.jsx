import React, { memo, useCallback, useRef, useState, useEffect } from "react";

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
  const [iconStatus, setIconStatus] = useState({}); //所有图标的状态

  // 使用 ref 跟踪最新状态
  const latestIconStatus = useRef({});

  // 监听状态变化
  useEffect(() => {
    console.log("图标状态已更新:", iconStatus);
    latestIconStatus.current = iconStatus;
  }, [iconStatus]);

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
    // 触发 actions 来更新 Redux store 中的状态
    changeTabsKey(key);

    // 设置新的action key
    setActiveKey(key);

    // 激活新图标
    if (iconRefs.current[key]) {
      currentIconRef.current = iconRefs.current[key];
      currentIconRef.current.activate();

      // 更新状态信息
      updateIconStatus();
    }
  };

  // 更新所有图标状态信息
  const updateIconStatus = useCallback(() => {
    const status = {};
    Object.keys(iconRefs.current).forEach((key) => {
      if (iconRefs.current[key]) {
        status[key] = iconRefs.current[key].getStatus();
      }
    });
    setIconStatus(status);
    latestIconStatus.current = status;
  }, []);

  // 重置所有图标状态
  const resetAllIcons = () => {
    // 重置所有图标的激活状态
    Object.values(iconRefs.current).forEach((ref) => {
      if (ref) {
        ref.deactivate();
      }
    });
    // 重置第一个标签为激活状态
    if (iconRefs.current["1"]) {
      iconRefs.current["1"].activate();
      setActiveKey("1");
    }
    updateIconStatus();
  };

  return (
    <NavWrapper>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabsKey}
        onChange={handleTabChange}
        items={navIconConfig.map(({ poster, videoSrc, key }, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: `Tab ${id}`,
            icon: (
              <NavIcon
                ref={(ref) => registerRef(id, ref)}
                poster={poster}
                videoSrc={videoSrc}
                tabKey={key}
                isActive={activeKey === String(key)}
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
