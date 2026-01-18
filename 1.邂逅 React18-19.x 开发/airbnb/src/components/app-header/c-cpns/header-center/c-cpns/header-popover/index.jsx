import React, { memo, useState, useRef, useMemo, useEffect } from "react";
import { PopoverWarpper } from "./style";
import { createPortal } from "react-dom";

const HeaderPopover = memo(({ children }) => {
  console.log(123123);

  const [componentBData, setComponentBData] = useState(null);

  const [bubbleStyle, setBubbleStyle] = useState(null);

  // --------------------------------------------
  const [open, setOpen] = useState(false);
  const [childWidth, setChildWidth] = useState(null);
  const [width, setWidth] = useState(null);
  const [left, setLeft] = useState(null);

  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const widthRef = useRef(null);
  const leftRef = useRef(null);

  const computeBubble = (index) => {
    const wrap = triggerRef.current;

    if (!wrap) return;
    // 找到segmented  渲染的item
    const containerRect = wrap.getBoundingClientRect();

    // Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
    // 三种行为：左靠小、居中全宽、右靠小
    const top = Math.round(containerRect.top + containerRect.height);

    if (index === 0) {
      widthRef.current = Math.round(containerRect.width * 0.5);
      leftRef.current = Math.round(containerRect.left);

      setBubbleStyle({ left: leftRef.current, top, width: widthRef.current });
    } else if (index === 1) {
      widthRef.current = Math.round(containerRect.width * 0.8);
      leftRef.current = Math.round(
        containerRect.left + (containerRect.width - widthRef.current) / 2
      );
      setBubbleStyle({ left: leftRef.current, top, width: widthRef.current });

      console.log(index, left, width, top);
    } else if (index === 2) {
      widthRef.current = Math.round(containerRect.width * 0.6);
      leftRef.current = Math.round(
        containerRect.width - widthRef.current + containerRect.left
      );
      setBubbleStyle({ left: leftRef.current, top, width: widthRef.current });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查点击是否在触发元素或Popover内容内部
      const isClickInsidePopover = popoverRef.current?.contains(event.target);
      const isClickOnTrigger = triggerRef.current?.contains(event.target);

      // 如果点击不在触发元素也不在Popover内部，则关闭Popover
      if (!isClickOnTrigger && !isClickInsidePopover) {
        setOpen(false);
        setBubbleStyle(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (triggerRef.current) {
      // 获取子组件的宽度
      const width = triggerRef.current.offsetWidth;

      setChildWidth(width);
    }
  }, []);
  useEffect(() => {
    // 等待 DOM 更新，确保 .ant-segmented-item 已渲染/布局完毕
    requestAnimationFrame(() => computeBubble(componentBData));
  }, [componentBData]);

  const handleTriggerClick = () => {
    // 先计算位置，再打开，保证有初始 left/width，能触发过渡
    computeBubble(componentBData);
    requestAnimationFrame(() => {
      setOpen(true);
    });
  };

  // 使用 useMemo 缓存配置
  const popoverItems = useMemo(() => {
    return (
      <div
        ref={popoverRef}
        style={{
          position: "absolute",
          display: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          top: bubbleStyle?.top,
          left: bubbleStyle?.left,
          width: bubbleStyle?.width,
          marginTop: 8,
          zIndex: 50,
          transform: open ? "scale(1)" : "scale(0)",
          /* 关键设置：从中心变换 */
          transformOrigin: "center",
          transition:
            "left 280ms cubic-bezier(.4,0,.2,1), width 280ms cubic-bezier(.4,0,.2,1), opacity 180ms linear, transform 280ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          这个子节点被放置在 document why 中。
        </div>
      </div>
    );
  }, [bubbleStyle, open]);

  return (
    <PopoverWarpper className="aaaaaaaaaaaaaaaaaaaaaaaaaas12">
      {/* {children} */}
      {/* 自定义气泡，不使用 antd Popover，以便做精确定位与动画 */}

      {typeof children === "function" ? (
        // 如果是函数传入setComponentBData,triggerRef,handleTriggerClick参数
        children({ setComponentBData, triggerRef, handleTriggerClick })
      ) : (
        <div ref={triggerRef} onClick={handleTriggerClick}>
          {children}
        </div>
      )}

      {createPortal(popoverItems, document.querySelector("#popoverPortals"))}

      {/* <Popover
        open={open}
        arrow={false}
        onOpenChange={(visible) => {
          // 阻止点击触发元素时的自动关闭
          if (visible) {
            setOpen(true);
          }
        }}
        trigger="click"
        content={
          <div className="aaaaaaaaa" ref={popoverRef}>
            气泡内容
            <div>点击外部区域关闭</div>
          </div>
        }
      >
        {typeof children === "function" ? (
          // 如果是函数传入setComponentBData,triggerRef,handleTriggerClick参数
          children({ setComponentBData, triggerRef, handleTriggerClick })
        ) : (
          <div ref={triggerRef} onClick={handleTriggerClick}>
            {children}
          </div>
        )}
      </Popover> */}
    </PopoverWarpper>
  );
});

export default HeaderPopover;
