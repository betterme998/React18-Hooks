import React, { memo, useState, useRef, useMemo } from "react";
import { PopoverWarpper } from "./style";

const HeaderPopover = memo(({ navIndex, bubbleVisible, bubbleStyle }) => {
  const labels = useMemo(() => ["Daily", "Weekly", "Monthly"], []);

  // const options = useMemo(
  //   () => labels.map((v) => ({ labels: v, value: v })),
  //   [labels]
  // );

  // 示例气泡内容，可以按 index 或 value 切换
  const renderBubbleContent = (index) => (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 600 }}>Options for {labels[index]}</div>
      <div style={{ marginTop: 6 }}>Some content here...</div>
    </div>
  );

  return (
    <PopoverWarpper>
      {/* 自定义气泡，不使用 antd Popover，以便做精确定位与动画 */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: bubbleStyle.left,
          width: bubbleStyle.width,
          marginTop: 8,
          zIndex: 50,
          pointerEvents: bubbleVisible ? "auto" : "none",
          opacity: bubbleVisible ? 1 : 0,
          transition:
            "left 280ms cubic-bezier(.4,0,.2,1), width 280ms cubic-bezier(.4,0,.2,1), opacity 180ms linear",
          transformOrigin:
            navIndex === 0
              ? "left center"
              : navIndex === 2
              ? "right center"
              : "center center",
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
          {renderBubbleContent(navIndex)}
        </div>
      </div>
    </PopoverWarpper>
  );
});

export default HeaderPopover;
