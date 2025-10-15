import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { IconWrapper } from "./style";

// header组件的导航栏图标组件--带状态的图标组件
const NavIcon = memo(({ ref, poster, videoSrc, twirl }) => {
  const containerRef = useRef(null); //引用图标容器DOM元素
  console.log("子组件");

  // 组件挂载时播放动画
  useEffect(() => {
    containerRef.current.play();
  }, []);

  // 使用useImperativeHandle 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
    // 激活图标 + 放大动画
    activate: () => {
      if (containerRef.current) {
        containerRef.current.play();
      }
    },

    // 取消激活 - 缩小图标
    deactivate: () => {
      if (containerRef.current) {
        containerRef.current.currentTime = 0;

        containerRef.current.pause();
      }
    },
    // 通知效果
    notify: () => {
      if (containerRef.current) {
        console.log("通知");
      }
    },
  }));

  return (
    <IconWrapper>
      <span className="nav-container">
        <video
          ref={containerRef}
          className="nav-video"
          playsInline
          muted
          poster={poster.default}
          preload="auto"
          key={twirl ? "twirl" : "normal"}
        >
          {videoSrc.map((item) => {
            return (
              <source src={twirl ? item.srcTwirl : item.src} type={item.type} />
            );
          })}
        </video>
      </span>
    </IconWrapper>
  );
});

export default NavIcon;
