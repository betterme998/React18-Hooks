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
  const [twirl, setTwirl] = useState(true); //是否为选择视频

  // 区分触摸按下（移动端）和鼠标按下（桌面端）
  const [isTouchPressed, setTouchPressed] = useState(false);
  const touchTimeoutRef = useRef(null);
  const TRANS_MS = 1000;
  // 鼠标/按下状态按 key 存储，避免全局冲突
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  // 组件挂载时播放动画
  useEffect(() => {
    currentIconRef.current?.activate();
  }, [twirl]);

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
  const handleMouseEnter = useCallback(
    (key) => {
      if (String(activeKey) !== String(key)) {
        setHoveredKey(String(key));
        setTouchPressed(false);
      }
    },
    [activeKey]
  );
  const handleMouseLeave = useCallback(() => {
    setHoveredKey(null);
    setPressedKey(null);
    setTouchPressed(false);
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  }, []);

  const handleMouseDown = useCallback(
    (key) => {
      if (String(activeKey) !== String(key)) {
        setPressedKey(String(key));
      }
    },
    [activeKey]
  );

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

  const handleTouchStart = useCallback(
    (key) => {
      if (String(activeKey) !== String(key)) {
        if (touchTimeoutRef.current) {
          clearTimeout(touchTimeoutRef.current);
          touchTimeoutRef.current = null;
        }
        setPressedKey(String(key));
        setTouchPressed(true);
      }
    },
    [activeKey]
  );

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
      if (String(activeKey) === k) return 1; //选中状态保持放大
      if (pressedKey === k) return isTouchPressed ? 0.7 : 0.1; //按下时缩小,幅度更大
      if (hoveredKey === k) return 1.1; //悬停时放大
      return 1; //默认大小
    },
    [activeKey, pressedKey, hoveredKey, isTouchPressed]
  );

  // 使用 useMemo 缓存配置,这是自定义的icon组件，因为使用了navIconConfig.map方法，为了避免多次创建，所以使用useMemo缓存
  const tabItems = useMemo(() => {
    const label = ["房源", "体验", "服务"];
    return navIconConfig.map(({ posters, videoSrc, key }, i) => {
      const id = String(i + 1);
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
            onTouchCancel={() => handleMouseLeave()} // 取消对应 mouseLeave
            className={`nav-tab-item nav-tab-item-${id}`}
            data-key={id}
          >
            <NavIcon
              ref={registerRef(id)}
              poster={posters}
              videoSrc={videoSrc}
              twirl={twirl}
              keys={key}
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
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
    registerRef,
    twirl,
  ]);

  // Tab切换处理函数
  const handleTabChange = useCallback(
    (key) => {
      (async () => {
        // 渲染初快速点击时取消所有图标动画
        if (!currentIconRef.current) {
          Object.keys(iconRefs.current).forEach((key) => {
            iconRefs.current[key].deactivate();
          });
        }

        // // 取消之前激活的图标状态
        if (activeKey && iconRefs.current[activeKey]) {
          iconRefs.current[activeKey].deactivate();
        }

        // 设置新的action key
        setActiveKey(key);

        // 激活新图标
        if (activeKey && iconRefs.current[key]) {
          currentIconRef.current = iconRefs.current[key];
          currentIconRef.current.activate?.(key);
        }
        if (twirl) {
          setTwirl(false);
        }

        // // 触发 actions 来更新 Redux store 中的状态来更新 Redux store 中的状态
        changeTabsKey(key);
      })();
    },
    [activeKey, changeTabsKey, twirl]
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
          // activeKey={tabsKey}
          onChange={handleTabChange}
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
