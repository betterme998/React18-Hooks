import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider, Input } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";

const HeaderSearch = memo(
  ({
    setComponentBData,
    changeSegmented,
    open,
    handleTriggerClick,
    labels,
  }) => {
    const [navIndex, setNavIndex] = useState(null); //状态控制导航指示器位置
    const containerRef = useRef(null);
    const [state, setState] = useState(null);
    const [playedEntry, setPlayedEntry] = useState(false); // 新增：是否播放首次选中动画

    useEffect(() => {
      if (!open) {
        setNavIndex(null);
        setPlayedEntry(false);
      }
    }, [open]);

    // 点击segmented后显示/隐藏计算气泡位置
    const handleChange = (value) => {
      const index = labels.findIndex((item) => item.title === value);

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
          }, 400);
        });
        return;
      }

      // 等待 DOM 更新，确保 .ant-segmented-item 已渲染/布局完毕
      // requestAnimationFrame(() => computeBubble(index));
      // 普通切换，直接更新
      setPlayedEntry(false);
      setNavIndex(index);

      setState(index);
      handleTriggerClick();

      changeSegmented(index);
    };

    // 滑块内容
    const options = useMemo(() => {
      return labels.map((item) => {
        return {
          label: (
            <div className="ant-segmented-item-Content">
              <div className="ant-options-item-title">{item.title}</div>
              <div className="ant-options-input">
                <Input
                  classNames={{
                    root: "ant-options-item-input",
                  }}
                  size="small"
                  variant="borderless"
                  placeholder={item.description}
                />
              </div>
            </div>
          ),
          value: item.title,
        };
      });
    }, [labels]);
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
        $playedEntry={playedEntry}
        className="headerSegmented"
        style={{ position: "relative" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                trackPadding: 0,
                itemHoverBg: open ? "#DDDDDD" : "#EBEBEB",
                trackBg: open ? "#EBEBEB" : "#fff",
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
            value={navIndex === null ? "" : labels[navIndex].title}
          />
        </ConfigProvider>
      </SearchWarpper>
    );
  },
);
// 参数一
const mapStateToProps = (state) => ({
  labels: state.header.label,
});

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeSegmented: (key) => {
    dispatch(changeSegmented(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
