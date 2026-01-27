import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";

const HeaderSearch = memo(
  ({ setComponentBData, changeSegmented, open, handleTriggerClick }) => {
    const [navIndex, setNavIndex] = useState(null); //状态控制导航指示器位置
    const containerRef = useRef(null);
    const [state, setState] = useState(null);
    const [playedEntry, setPlayedEntry] = useState(false); // 新增：是否播放首次选中动画

    const labels = useMemo(() => ["Daily", "Weekly", "Monthly"], []);

    useEffect(() => {
      if (!open) {
        setNavIndex(null);
        setPlayedEntry(false);
      }
    }, [open]);
    // useEffect(() => {
    //   if (navIndex !== null) {
    //     setPlayedEntry(false);
    //   }
    // }, [navIndex]);

    // 点击segmented后显示/隐藏计算气泡位置
    const handleChange = (value) => {
      const index = labels.indexOf(value);

      if (index === -1) return;

      // 如果之前没有选中（navIndex === ''）,则播放首次选中缩放动画
      const wasEmpty = navIndex === null;

      if (wasEmpty) {
        // 下一针触发放大动画
        requestAnimationFrame(() => {
          setPlayedEntry(true);
          requestAnimationFrame(() => {
            setNavIndex(index);

            setState(index);
            handleTriggerClick();

            changeSegmented(index);
          });

          // 动画时长与样式中一致，动画完成后清楚标志，防止后续点击再次播放
          setTimeout(() => {
            setPlayedEntry(false);
          }, 200);
        });
        return;
      }

      // 等待 DOM 更新，确保 .ant-segmented-item 已渲染/布局完毕
      // requestAnimationFrame(() => computeBubble(index));
      // 普通切换，直接更新
      setNavIndex(index);

      setState(index);
      handleTriggerClick();

      changeSegmented(index);
    };

    // 在ant的分段控制器SearchWarpper组件中使用ant的气泡提示组件Popover
    const options = useMemo(() => {
      const label = ["Daily", "Weekly", "Monthly"];
      return label.map((item) => {
        return {
          label: (
            <div
              className="ant-segmented-item-Animation"
              style={{
                width: "100%",
                textAlign: "center",
                userSelect: "none",
              }}
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
        open={open}
        playedEntry={playedEntry}
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
            value={navIndex === null ? "" : labels[navIndex]}
          />
        </ConfigProvider>
      </SearchWarpper>
    );
  },
);
// 参数一
// const mapStateToProps = (state) => ({
//   tabsKey: state.header.tabsKey,
// });

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeSegmented: (key) => {
    dispatch(changeSegmented(key));
  },
});

export default connect(null, mapDispatchToProps)(HeaderSearch);
