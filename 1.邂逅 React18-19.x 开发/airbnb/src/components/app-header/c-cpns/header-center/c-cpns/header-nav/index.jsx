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
  const [twirl, setTwirl] = useState(true); //是否为选择视频

  // ========== 核心修改：点击队列和防抖机制 ==========
  // 使用队列收集快速点击，确保只处理最后一次点击
  const clickQueueRef = useRef([]); // 存储点击事件的队列
  const processingRef = useRef(false); //标记是否正在处理点击，防止重复处理
  const TRANS_MS = 150;

  const [isTouchPressed, setTouchPressed] = useState(false); // 区分触摸按下（移动端）和鼠标按下（桌面端）
  const touchTimeoutRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null); // 鼠标/按下状态按 key 存储，避免全局冲突
  const [hoveredKey, setHoveredKey] = useState(null); // 添加鼠标悬停状态

  // 组件挂载时播放动画
  useEffect(() => {
    currentIconRef.current?.activate();
  }, [twirl]);

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

  const handleMouseEnter = useCallback(
    (key) => {
      if (String(activeKey) !== String(key)) {
        setHoveredKey(String(key));
      }
    },
    [activeKey]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredKey(null);
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
      console.log(key);

      if (pressedKey === k) return isTouchPressed ? 0.1 : 0.1; //按下时缩小,幅度更大
      if (String(activeKey) === k) return 1; //选中状态保持放大

      // 如果当前是hover状态，则返回1.1
      if (hoveredKey === k) return 1.1;

      return 1; //默认大小
    },
    // [activeKey, pressedKey, hoveredKey, isTouchPressed]
    [activeKey, pressedKey, isTouchPressed, hoveredKey]
  );

  // ========== 核心修改：处理点击队列 ==========
  const processClickQueue = useCallback(() => {
    // 如果正在处理中或队列为空，直接返回
    if (processingRef.current || clickQueueRef.current.length === 0) return;

    processingRef.current = true; //标记为处理中状态

    // 获取队列中最后一个点击（实现只处理最后一次点击）
    const lastClick = clickQueueRef.current[clickQueueRef.current.length - 1];
    clickQueueRef.current = []; //清空队列，准备接收新的点击

    const { key } = lastClick;

    // 关键逻辑：如果最后点击的是当前已激活的标签，不进行任何切换
    if (key === activeKey) {
      processingRef.current = false; //释放处理锁
      return;
    }

    // 执行切换动画：先停用当前激活的图标
    if (iconRefs.current[activeKey]) {
      iconRefs.current[activeKey].deactivate();
    }

    // 延迟执行新图标的激活和状态更新
    setTimeout(() => {
      // 激活新点击的图标
      if (iconRefs.current[key]) {
        currentIconRef.current = iconRefs.current[key];
        currentIconRef.current.activate?.(key);
      }

      // 更新激活
      setActiveKey(key);

      // 触发 Redux action 更新全局状态
      changeTabsKey(key);

      // 释放处理锁
      processingRef.current = false;

      // 检查处理过程中是否有新的点击加入，如果有则继续处理
      if (clickQueueRef.current.length > 0) {
        processClickQueue();
      }
    }, TRANS_MS); // 等待动画完成
    // 更新twirl状态
    if (twirl) {
      setTwirl(false);
    }
  }, [activeKey, changeTabsKey, twirl]);

  // ========== 核心修改：简化的Tab切换处理函数 ==========
  const handleTabChange2 = useCallback(
    (key) => {
      // 将当前点击加入队列
      clickQueueRef.current.push({ key, timestamp: Date.now() });

      // 延迟处理，收集快速连续点击
      // 50ms d的收集窗口，在这个时间内所有快速点击都会被收集，但只处理最后一个
      setTimeout(() => {
        processClickQueue();
      }, 500);
    },
    [processClickQueue]
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
      (async () => {
        // 如果正在切换中，直接返回
        // if (isChanging) return;

        // 如果点击的是当前已激活的标签，直接返回
        // if (key === activeKey) return;

        // 设置切换锁
        // setIsChanging(true);
        // 渲染初快速点击时取消所有图标动画
        if (!currentIconRef.current) {
          Object.keys(iconRefs.current).forEach((key) => {
            iconRefs.current[key].deactivate();
          });
        }

        // 同时通过ref调用方法确保状态同步
        if (iconRefs.current[activeKey]) {
          iconRefs.current[activeKey].deactivate();
        }
        if (changeTimeoutRef.current) {
          clearTimeout(changeTimeoutRef.current);
          changeTimeoutRef.current = null;
        }
        changeTimeoutRef.current = setTimeout(() => {
          if (iconRefs.current[key]) {
            currentIconRef.current = iconRefs.current[key];
            currentIconRef.current.activate?.(key);
          }
          // 动画结束后释放切换锁
          // setIsChanging(false);
          // 立即更新激活状态 - 这会让子组件立即收到新的isActive props
          setActiveKey(key);
          changeTimeoutRef.current = null;
        }, TRANS_MS * 2);

        // 等待动画结束后再播放视频
        // setTimeout(() => {
        //   if (iconRefs.current[key]) {
        //     currentIconRef.current = iconRefs.current[key];
        //     currentIconRef.current.activate?.(key);
        //   }
        //   // 动画结束后释放切换锁
        //   setIsChanging(false);
        //   // 立即更新激活状态 - 这会让子组件立即收到新的isActive props
        //   setActiveKey(key);
        // }, TRANS_MS * 2);

        if (twirl) {
          setTwirl(false);
        }

        // 触发 actions 来更新 Redux store 中的状态
        changeTabsKey(key);
      })();
    },
    // [activeKey, changeTabsKey, twirl, isChanging]
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
          activeKey={activeKey}
          onChange={handleTabChange2}
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
