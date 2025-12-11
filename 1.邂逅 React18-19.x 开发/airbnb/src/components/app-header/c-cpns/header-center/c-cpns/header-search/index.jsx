import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider } from "antd";

const HeaderSearch = memo(() => {
  const [navIndex, setNavIndex] = useState(0); //状态控制导航指示器位置
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  const labels = useMemo(() => ["Daily", "Weekly", "Monthly"], []);
  // const options = useMemo(
  //   () => labels.map((v) => ({ labels: v, value: v })),
  //   [labels]
  // );

  const computeBubble = (index) => {
    const wrap = containerRef.current;
    if (!wrap) return;
    // 找到segmented  渲染的item
    const items = wrap.querySelectorAll(".ant-segmented-item");
    const containerRect = wrap.getBoundingClientRect();
    const item = items[index] || items[0];
    if (!item) return;

    const itemRect = item.getBoundingClientRect();
    // 三种行为：左靠小、居中全宽、右靠小
    if (index === 0) {
      const width = Math.round(itemRect.width * 0.9);
      const left = Math.round(itemRect.left - containerRect.left);
      setBubbleStyle({ left, width });
    } else if (index === 1) {
      const width = Math.round(containerRect.width);
      const left = 0;
      setBubbleStyle({ left, width });
    } else {
      const width = Math.round(itemRect.width * 0.8);
      const left = Math.round(containerRect.width - width);
      setBubbleStyle({ left, width });
    }
  };

  // 点击segmented后显示/隐藏计算气泡位置
  const handleChange = (value) => {
    const index = labels.indexOf(value);
    if (index === -1) return;
    if (navIndex === index && bubbleVisible) {
      setBubbleVisible(false);
    } else {
      setNavIndex(index);
      setBubbleVisible(true);
      // 等待 DOM 更新，确保 .ant-segmented-item 已渲染/布局完毕
      requestAnimationFrame(() => computeBubble(index));
    }
  };

  // 示例气泡内容，可以按 index 或 value 切换
  const renderBubbleContent = (index) => (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 600 }}>Options for {labels[index]}</div>
      <div style={{ marginTop: 6 }}>Some content here...</div>
    </div>
  );

  // 在ant的分段控制器SearchWarpper组件中使用ant的气泡提示组件Popover
  const options = useMemo(() => {
    const label = ["Daily", "Weekly", "Monthly"];
    return label.map((item) => {
      return {
        label: (
          <div
            style={{ width: "100%", textAlign: "center", userSelect: "none" }}
          >
            {item}
          </div>
        ),
        value: item,
      };
    });
  }, []);

  return (
    <SearchWarpper className="headerSegmented" style={{ position: "relative" }}>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              trackPadding: 0,
            },
          },
        }}
      >
        <Segmented
          ref={containerRef}
          // options={["Daily", "Weekly", "Monthly"]}
          options={options}
          size="large"
          block
          shape="round"
          onChange={handleChange}
          // 保持 value，使选中项样式正确
          value={labels[navIndex]}
        />
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
      </ConfigProvider>
    </SearchWarpper>
  );
});

export default HeaderSearch;
