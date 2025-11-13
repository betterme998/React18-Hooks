import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";

import { IconWrapper } from "./style";

// header组件的导航栏图标组件--带状态的图标组件
const NavIcon = memo(({ ref, poster, videoSrc, twirl, keys }) => {
  const containerRef = useRef(null); //引用图标容器DOM元素
  const [isActive, setActive] = useState(false);

  // 组件挂载时播放动画
  useEffect(() => {
    // console.log("播放");

    if (keys === 1) {
      setActive(true);
    }

    const v = containerRef.current;
    if (!v) return;
    // 确保以属性 + DOM property 的方式都设置好
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x5-playsinline", "true");
    v.play().catch((e) => {
      console.log(e);
    });
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

  const currentPoster = useMemo(
    () => (isActive ? poster.posterActive : poster.poster),
    [isActive, poster]
  );

  return (
    <IconWrapper className="nav-icon-wrapper">
      <span className="nav-container">
        <video
          ref={containerRef}
          className="nav-video"
          disablePictureInPicture
          playsInline
          autoPlay={twirl}
          muted
          poster={currentPoster}
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
