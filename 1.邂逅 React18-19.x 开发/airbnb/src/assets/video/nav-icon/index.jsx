import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { IconWrapper } from "./style";

// header组件的导航栏图标组件--带状态的图标组件
const NavIcon = memo(({ ref, poster, videoSrc, tabKey, isActive }) => {
  const containerRef = useRef(null); //引用图标容器DOM元素
  const [lastAction, setLastAction] = useState(null); //记录最后一次操作
  const [internalIsActive, setInternalIsActive] = useState(false); //内部激活状态

  // 记录交互信息的方法
  const recordInteraction = (action) => {
    setLastAction({
      type: action, //操作类型：'activate','deactivate','notify':激活,使无效,通知
      timestamp: new Date().toLocaleTimeString(), //时间戳
    });
  };

  // 使用useImperativeHandle 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
    // 激活图标 + 放大动画
    activate: () => {
      setInternalIsActive(true);
      recordInteraction("activate");
      if (containerRef.current) {
        containerRef.current.play().catch((error) => {
          console.error("自动播放失败:", error);
        });
      }
    },

    // 取消激活 - 缩小图标
    deactivate: () => {
      setInternalIsActive(false);
      recordInteraction("deactivate");

      if (containerRef.current) {
      }
    },
    // 通知效果
    notify: () => {
      if (containerRef.current) {
        console.log("通知");
      }
    },

    // 状态查询方法
    getLastAction: () => lastAction,
    getStatus: () => {
      return {
        tabKey,
        lastAction,
        isActive, //使用内部状态判断激活状态
      };
    },
  }));

  return (
    <IconWrapper>
      <span className="nav-container">
        <video
          ref={containerRef}
          className="nav-video"
          playsInline
          poster={poster.default}
          preload="auto"
        >
          {videoSrc.map((item) => {
            return <source src={item.src} type={item.type} />;
          })}
        </video>
      </span>
    </IconWrapper>
  );
});

export default NavIcon;
