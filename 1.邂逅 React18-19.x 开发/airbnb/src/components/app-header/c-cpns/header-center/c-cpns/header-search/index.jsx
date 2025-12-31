import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";

import HeaderPopover from "@/components/app-header/c-cpns/header-center/c-cpns/header-popover";

const HeaderSearch = memo(({ setComponentBData }) => {
  const [navIndex, setNavIndex] = useState(0); //状态控制导航指示器位置
  const containerRef = useRef(null);
  const [state, setState] = useState(null);

  const labels = useMemo(() => ["Daily", "Weekly", "Monthly"], []);
  // const options = useMemo(
  //   () => labels.map((v) => ({ labels: v, value: v })),
  //   [labels]
  // );

  // 点击segmented后显示/隐藏计算气泡位置
  const handleChange = (value) => {
    const index = labels.indexOf(value);

    if (index === -1) return;

    setNavIndex(index);
    // 等待 DOM 更新，确保 .ant-segmented-item 已渲染/布局完毕
    // requestAnimationFrame(() => computeBubble(index));

    setState(index);
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
  // ------------------------------------------------------气泡组件数据-----------

  // 当state变化时，通知ComponentA
  useEffect(() => {
    if (setComponentBData) {
      setComponentBData(state);
    }
  }, [state, setComponentBData]);

  return (
    <SearchWarpper
      // onClick={handleSliderClick}
      className="headerSegmented"
      style={{ position: "relative" }}
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
