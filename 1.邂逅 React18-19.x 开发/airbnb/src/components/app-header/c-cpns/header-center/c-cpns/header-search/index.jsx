import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";

import HeaderPopover from "@/components/app-header/c-cpns/header-center/c-cpns/header-popover";

const HeaderSearch = memo(({ triggerRef }) => {
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
      console.log(left);

      setBubbleStyle({ left, width });
    } else if (index === 1) {
      const width = Math.round(containerRect.width);
      const left = 0;
      setBubbleStyle({ left, width });
    } else {
      const width = Math.round(itemRect.width * 0.8);
      const left = Math.round(containerRect.width - width);
      console.log(left);

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
    <SearchWarpper
      // onClick={handleSliderClick}
      className="headerSegmented"
      style={{ position: "relative" }}
      ref={triggerRef}
    >
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
        {/* <HeaderPopover
          navIndex={navIndex}
          bubbleVisible={bubbleVisible}
          bubbleStyle={bubbleStyle}
        ></HeaderPopover> */}
      </ConfigProvider>
    </SearchWarpper>
  );
});
// 参数一
// const mapStateToProps = (state) => ({
//   tabsKey: state.header.tabsKey,
// });

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeTabsKey: (key) => {
    dispatch(changeSegmented(key));
  },
});

export default connect(null, mapDispatchToProps)(HeaderSearch);
