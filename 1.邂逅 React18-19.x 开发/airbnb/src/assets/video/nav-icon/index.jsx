import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { IconWrapper } from "./style";

// header组件的导航栏图标组件--带状态的图标组件
const NavIcon = memo(({ ref, poster, videoSrc, twirl, keys }) => {
  const containerRef = useRef(null); //引用图标容器DOM元素
  const [isActive, setActive] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);
  console.log("子组件", twirl);

  // 组件挂载时播放动画
  useEffect(() => {
    console.log("播放");

    containerRef.current?.play();
    if (keys === 1) {
      setActive(true);
    }
  }, [keys]);

  // 使用useImperativeHandle 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
    // 激活图标 + 放大动画
    activate: () => {
      if (containerRef.current) {
        setActive(true);

        containerRef.current.play();
      }
    },

    // 取消激活 - 缩小图标
    deactivate: () => {
      if (containerRef.current) {
        setActive(false);
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

  // 鼠标事件处理
  const handleMouseEnter = () => {
    if (!isActive) {
      setHovered(true);
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
  };

  const handleMouseDown = () => {
    if (!isActive) {
      setPressed(true);
    }
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  // 计算缩放比例
  const getScale = () => {
    if (isActive) return 1; //选中状态保持放大
    if (isPressed) return 0.8; //按下时缩小
    if (isHovered) return 1.1; //悬停时放大
    return 1; //默认大小
  };

  return (
    <IconWrapper
      scale={getScale()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span className="nav-container">
        <video
          ref={containerRef}
          className="nav-video"
          disablePictureInPicture
          playsInline
          autoPlay={twirl}
          muted
          poster={isActive ? poster.posterActive : poster.poster}
          preload="auto"
          key={twirl ? "twirl" : "normal"}
          // 针对某些特定环境的属性，如部分国产浏览器或WebView
          webkit-playsinline="true"
          x5-playsinline="true"
        >
          {videoSrc.map((item) => {
            return (
              <source
                key={item.src}
                src={twirl ? item.srcTwirl : item.src}
                type={item.type}
              />
            );
          })}
        </video>
      </span>
      <span className="nav-dir" style={{ display: keys !== 1 ? "" : "none" }}>
        <span className="nav-dir-text">全新</span>
      </span>
    </IconWrapper>
  );
});

export default NavIcon;
