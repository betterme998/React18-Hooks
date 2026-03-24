import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";
import HeaderSearch2 from "./c-cpns/header-search2";

import HeaderPopover from "./c-cpns/header-popover";

const HeaderCenter = memo(() => {
  const [isFixed, setIsFixed] = useState(false); //滚动条是否在顶部
  const isFixedRef = useRef(isFixed); //避免闭包问题
  const animationFrameRef = useRef(0); // requestAnimationFrame ID

  useEffect(() => {
    isFixedRef.current = isFixed;
  }, [isFixed]);

  const handleScroll = useCallback(() => {
    // 取消上一帧的待执行任务，保证滚动高频时只执行最后一帧
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      const shouldBeFixed = window.scrollY > 0; // 判断是否离开顶部

      // 状态变化时才更新样式，避免重复触发重绘和动画干扰
      if (shouldBeFixed !== isFixedRef.current) {
        setIsFixed(shouldBeFixed);
      }
    });
  }, []);

  useEffect(() => {
    // 初始化时检查滚动状态
    // 滚动条滑动离开顶部->搜索框变小（需要清除搜索框选中状态，退出气泡组件）

    setIsFixed(window.scrollY > 0);
    // 添加滚动事件监听（使用 passive 提升滚动性能）
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderPopover>
            {/* 父组件方法和数据给子组使用
            triggerRef：用于判断点击的是哪里，是否打开/关闭气泡
            open：打开或关闭气泡
            setComponentBData：当前点击的值，这是个useState，子组件点击传给父组件，用于计算气泡位置
            handleTriggerClick：用于判断第一次点击和后续点击，处理了两种情况
            */}
            {({ setComponentBData, triggerRef, handleTriggerClick, open }) => (
              <div className="popoverSolt" ref={triggerRef}>
                <HeaderNav />
                {/* <HeaderSearch
                  setComponentBData={setComponentBData}
                  open={open}
                  handleTriggerClick={handleTriggerClick}
                /> */}
                <HeaderSearch2
                  setComponentBData={setComponentBData}
                  open={open}
                  little={isFixed}
                  handleTriggerClick={handleTriggerClick}
                />
              </div>
            )}
          </HeaderPopover>
        </div>

        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
