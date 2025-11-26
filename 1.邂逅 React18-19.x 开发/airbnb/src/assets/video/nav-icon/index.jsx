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
const NavIcon = memo(({ ref, poster, videoSrc, twirl, keys, isActive2 }) => {
  const containerRef = useRef(null); //引用图标容器DOM元素
  const canvasRef = useRef(null); //绘制用canvas
  const rafRef = useRef(null); //requestAnimationFrame id
  const drawLockRef = useRef(false); //防重启
  // const [isActive, setActive] = useState(false);

  const [isActive, setActive] = useState(Boolean(isActive2));
  useEffect(() => {
    if (typeof isActive2 !== "undefined") {
      setActive(Boolean(isActive2));
    }
  }, [isActive2]);

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
    startCanvasLoop();
  }, [keys]);

  // 每帧绘制 video 到 canvas
  const drawFrame = () => {
    const c = canvasRef.current;
    const v = containerRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    try {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(v, 0, 0, c.width, c.height);
    } catch (e) {}
    rafRef.current = requestAnimationFrame(drawFrame);
  };

  const startCanvasLoop = () => {
    if (drawLockRef.current) return;
    drawLockRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current); //方法取消一个先前通过调用 requestAnimationFrame() 方法添加到计划中的动画帧请求。
    rafRef.current = requestAnimationFrame(drawFrame);
  };

  // 使用useImperativeHandle 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
    // 激活图标 + 放大动画
    activate: () => {
      if (containerRef.current) {
        setActive(true);
        try {
          containerRef.current.currentTime = 0;
          containerRef.current.muted = true;
          // 确保元素仍在文档中再播放
          if (containerRef.current.isConnected) {
            containerRef.current.play().catch(() => {});
            startCanvasLoop();
          }
        } catch (e) {}
      }
    },

    // 取消激活 - 缩小图标
    deactivate: () => {
      if (containerRef.current) {
        setActive(false);
        try {
          containerRef.current.pause();
          containerRef.current.currentTime = 0;
          // 关键：调用 load() 强制恢复到 poster（避免显示最后一帧）
          containerRef.current.load();
        } catch (e) {}
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
        <canvas ref={canvasRef} className="nav-video"></canvas>
      </span>
      <span className="nav-dir" style={{ display: keys !== 1 ? "" : "none" }}>
        <span className="nav-dir-text">全新</span>
      </span>
    </IconWrapper>
  );
});

export default NavIcon;
