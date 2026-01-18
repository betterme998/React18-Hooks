import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";

// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeTabsKey } from "@/store/modules/header";

import { NavWrapper, NavIconWrapper } from "./style";
import { ConfigProvider, Tabs } from "antd";

import NavIcon from "@/assets/video/nav-icon"; //自己写的icon组件
import navIconConfig from "./config/navIcon.config"; //控制icon照片视频配置文件

const HeaderNav = memo(({ tabsKey, changeTabsKey }) => {
  const [activeKey, setActiveKey] = useState("1"); //当前激活的标签页
  const iconRefs = useRef({}); //存储所有图标ref的对象
  const currentIconRef = useRef(null); //当前激活图标的ref
  const changeTimeoutRef = useRef(null);

  const pendingKeyRef = useRef(null); // 记录当前 pending 的目标 key
  const [twirl, setTwirl] = useState(true); //是否为选择视频

  const TRANS_MS = 150;

  const [isTouchPressed, setTouchPressed] = useState(false); // 区分触摸按下（移动端）和鼠标按下（桌面端）
  const touchTimeoutRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null); // 鼠标/按下状态按 key 存储，避免全局冲突
  const [hoveredKey, setHoveredKey] = useState(null); // 添加鼠标悬停状态

  // 性能优化解决闭包
  // 通过useRef解决闭包陷阱
  const activeKeyRef = useRef();
  const twirlRef = useRef();
  const changeTabsKeyRef = useRef();
  const isTouchPressedRef = useRef();
  activeKeyRef.current = activeKey;
  twirlRef.current = twirl;
  changeTabsKeyRef.current = changeTabsKey;
  isTouchPressedRef.current = isTouchPressed;

  // 组件挂载时播放动画
  useEffect(() => {
    currentIconRef.current?.activate();
  }, []);

  // 清除定时器
  useEffect(() => {
    const changeTimer = changeTimeoutRef.current;
    const touchTimer = touchTimeoutRef.current;
    return () => {
      if (changeTimer) {
        clearTimeout(changeTimer);
      }
      if (touchTimer) {
        clearImmediate(touchTimer);
      }
    };
  }, []);

  // 注册ref - 将每个图标的ref存储到iconRefs中
  const registerRef = useCallback(
    (key) => (ref) => {
      if (ref) {
        iconRefs.current[key] = ref;
      }
    },
    []
  );

  // 鼠标事件处理

  const handleMouseEnter = useCallback((key) => {
    if (String(activeKeyRef.current) !== String(key)) {
      setHoveredKey(String(key));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredKey(null);
    // 立即清除按下状态并清理定时器（不要依赖后续 mouseup）
    setPressedKey(null);
    setTouchPressed(false);
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  }, []);

  const handleMouseDown = useCallback((key) => {
    if (String(activeKeyRef.current) !== String(key)) {
      setPressedKey(String(key));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    // 延迟清除，保证缩小动画能完整展示

    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    touchTimeoutRef.current = setTimeout(() => {
      setPressedKey(null);
      setTouchPressed(false);
      touchTimeoutRef.current = null;
    }, TRANS_MS);
  }, []);

  // // 专门的触摸处理：触摸按下时放大/缩小幅度更大

  const handleTouchStart = useCallback((key) => {
    if (String(activeKeyRef.current) !== String(key)) {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
      setPressedKey(String(key));
      setTouchPressed(true);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    //延迟恢复，保证缩放动画可见(可根据体验调整)
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setPressedKey(null);
      setTouchPressed(false);
      touchTimeoutRef.current = null;
    }, TRANS_MS);
  }, []);

  // 计算缩放比例
  const scale = useCallback(
    (key) => {
      const k = String(key);

      if (pressedKey === k) return isTouchPressedRef.current ? 0.7 : 0.8; //按下时缩小,幅度更大
      if (String(activeKeyRef.current) === k) return 1; //选中状态保持放大

      // 如果当前是hover状态，则返回1.1
      if (hoveredKey === k) return 1.1;

      return 1; //默认大小
    },
    // [activeKey, pressedKey, hoveredKey, isTouchPressed]
    [pressedKey, hoveredKey]
  );

  // 使用 useMemo 缓存配置
  const tabItems = useMemo(() => {
    const label = ["房源", "体验", "服务"];
    return navIconConfig.map(({ posters, videoSrc, key }, i) => {
      const id = String(i + 1);
      const isActive = String(activeKey) === id; // 计算当前标签是否激活

      return {
        key: id,
        label: (
          <NavIconWrapper
            scale={scale(id)}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={() => handleMouseDown(id)}
            onMouseUp={() => handleMouseUp()}
            onTouchStart={() => handleTouchStart(id)} // 手指按下对应 mouseDown
            onTouchEnd={() => handleTouchEnd()} // 手指抬起对应 mouseUp
            onTouchCancel={() => handleTouchEnd()} // 触摸被取消时也恢复
            onPointerCancel={() => handleMouseLeave()} // pointer 取消/离开也恢复
            className={`nav-tab-item ${
              isActive ? "ant-tabs-tab-active" : ""
            } nav-tab-item-${id}`}
            data-key={id}
          >
            <NavIcon
              ref={registerRef(id)}
              poster={posters}
              videoSrc={videoSrc}
              twirl={twirl}
              keys={key}
              isActive2={isActive} // 传递当前激活状态
            />
            <span className={`nav-tab-label-text nav-tab-label-text-${id}`}>
              {label[i]}
            </span>
          </NavIconWrapper>
        ),
      };
    });
  }, [
    scale,
    activeKey, // 添加activeKey依赖
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
    registerRef,
    twirl,
  ]);

  // Tab切换处理函数 - 确保立即更新状态
  const handleTabChange = useCallback(
    (key) => {
      // 统一用字符串比较
      const k = String(key);
      // const cur = String(activeKey);

      // 如果点击的是当前已激活项，什么都不做（仅记录点击可在这里加逻辑）
      if (k === activeKeyRef.current) {
        if (changeTimeoutRef.current) {
          clearTimeout(changeTimeoutRef.current);
          changeTimeoutRef.current = null;
          pendingKeyRef.current = null;
        }
        // 可选：清除按下状态，保证视觉复位
        setPressedKey(null);
        setTouchPressed(false);
        return;
      }
      // 如果已经有一个 pending，而且 pending 是相同的 key，则不重置定时器（第一次点击已生效）
      if (changeTimeoutRef.current && pendingKeyRef.current === k) {
        return;
      }

      // 否则覆盖/重置 pending：清理之前的定时器并设置新的 pending
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
        changeTimeoutRef.current = null;
      }
      pendingKeyRef.current = k;

      changeTimeoutRef.current = setTimeout(() => {
        if (iconRefs.current[k]) {
          currentIconRef.current = iconRefs.current[k];
          currentIconRef.current.activate?.(k);
          // 立即更新激活状态 - 这会让子组件立即收到新的isActive props
          setActiveKey(k);

          // 同时通过ref调用方法确保状态同步
          if (iconRefs.current[activeKeyRef.current]) {
            iconRefs.current[activeKeyRef.current].deactivate();
          }
        }

        // 清理 pending
        pendingKeyRef.current = null;
        changeTimeoutRef.current = null;
      }, TRANS_MS * 2);

      if (twirlRef.current) {
        setTwirl(false);
      }

      // 触发 actions 来更新 Redux store 中的状态
      changeTabsKeyRef.current(key);
      // changeTabsKey(key);
    },
    // [activeKey, changeTabsKey, twirl, isChanging]
    []
  );
  return (
    <NavWrapper>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemActiveColor: "#222222",
              itemSelectedColor: "#222222",
              inkBarColor: "#222222",
              horizontalItemGutter: 0,
              cardGutter: 0,
              horizontalItemPadding: "0px 0px 12px 0px",
              cardHeight: 36,
            },
          },
        }}
      >
        <Tabs
          className="nav-tabs66"
          defaultActiveKey="1"
          activeKey={activeKey}
          // onChange={handleTabChange}
          onTabClick={handleTabChange}
          items={tabItems}
        />
      </ConfigProvider>
    </NavWrapper>
  );
});
// 参数一
// const mapStateToProps = (state) => ({
//   tabsKey: state.header.tabsKey,
// });

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeTabsKey: (key) => {
    dispatch(changeTabsKey(key));
  },
});

export default connect(null, mapDispatchToProps)(HeaderNav);
