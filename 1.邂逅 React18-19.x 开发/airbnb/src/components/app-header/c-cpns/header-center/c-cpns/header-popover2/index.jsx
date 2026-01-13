import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { PopoverWarpper } from "./style";

// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { changeSegmented } from "@/store/modules/header";

const HeaderPopover2 = memo(({ children }) => {
  const labels = useMemo(() => ["Daily", "Weekly", "Monthly"], []);
  const [componentBData, setComponentBData] = useState(null);

  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  // const options = useMemo(
  //   () => labels.map((v) => ({ labels: v, value: v })),
  //   [labels]
  // );
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  // 示例气泡内容，可以按 index 或 value 切换
  const renderBubbleContent = (index) => (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 600 }}>Options for {labels[index]}</div>
      <div style={{ marginTop: 6 }}>Some content here...</div>
    </div>
  );
  // --------------------------------------------
  const [open, setOpen] = useState(false);
  const [childWidth, setChildWidth] = useState(false);

  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  // 从 store 读取 segmented 值
  // UseSelector 用于从完整的Store中选取出一部分State，并在选出的这一部分State发生变化的时候通知React重新渲染组件
  const segmented = useSelector((state) => state.header?.segmented ?? 0);

  const computeBubble = useCallback(
    (index) => {
      const wrap = triggerRef.current;
      if (!wrap) return;
      // 找到segmented  渲染的item
      const items = wrap.querySelectorAll(".ant-segmented-item");
      const containerRect = wrap.getBoundingClientRect();
      const item = items[index] || items[0];
      if (!item) return;

      // Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
      const itemRect = item.getBoundingClientRect();
      // 三种行为：左靠小、居中全宽、右靠小
      if (index === 0) {
        const width = Math.round(containerRect.width * 0.5);
        const left = Math.round(itemRect.left - containerRect.left);

        setBubbleStyle({ left, width });
      } else if (index === 1) {
        const width = Math.round(containerRect.width);
        const left = 0;
        setBubbleStyle({ left, width });
      } else {
        const width = Math.round(containerRect.width * 0.5);
        const left = Math.round(containerRect.width - width);

        setBubbleStyle({ left, width });
      }
      console.log(index, bubbleStyle);
    },
    [bubbleStyle]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查点击是否在触发元素或Popover内容内部
      const isClickInsidePopover = popoverRef.current?.contains(event.target);
      const isClickOnTrigger = triggerRef.current?.contains(event.target);

      // 如果点击不在触发元素也不在Popover内部，则关闭Popover
      if (!isClickOnTrigger && !isClickInsidePopover) {
        setOpen(false);
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
    requestAnimationFrame(() => computeBubble(segmented));
  }, [segmented, computeBubble]);
  const handleTriggerClick = () => {
    // 点击触发元素时只打开，不关闭
    if (!open) {
      setOpen(true);
    }
  };

  // 可选：调试输出
  useEffect(() => {
    console.log(
      "segmented from store:",
      segmented,
      "bubbleStyle:",
      bubbleStyle
    );
  }, [segmented, bubbleStyle]);

  return (
    <PopoverWarpper>
      {typeof children === "function" ? (
        // 如果是函数传入setComponentBData,triggerRef,handleTriggerClick参数
        children({ setComponentBData, triggerRef, handleTriggerClick })
      ) : (
        <div ref={triggerRef} onClick={handleTriggerClick}>
          {children}
        </div>
      )}
      {/* 自定义气泡，不使用 antd Popover，以便做精确定位与动画 */}
      <div
        style={{
          position: "absolute",
          display: open ? "block" : "none",
          width: "100px",
          height: "50px",
          top: "100%",
          // left: bubbleStyle.left,
          // width: bubbleStyle.width,
          marginTop: 8,
          zIndex: 50,
          // pointerEvents: bubbleVisible ? "auto" : "none",
          // opacity: bubbleVisible ? 1 : 0,
          transition:
            "left 280ms cubic-bezier(.4,0,.2,1), width 280ms cubic-bezier(.4,0,.2,1), opacity 180ms linear",
          // transformOrigin:
          //   navIndex === 0
          //     ? "left center"
          //     : navIndex === 2
          //     ? "right center"
          //     : "center center",
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
          123333333333333333333331111111111111111111111111
        </div>
      </div>
    </PopoverWarpper>
  );
});

export default HeaderPopover2;
