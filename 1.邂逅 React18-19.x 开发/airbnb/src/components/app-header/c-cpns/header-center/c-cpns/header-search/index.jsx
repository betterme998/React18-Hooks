import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider, Input } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";
import IconShutDown from "@/assets/svg/icon_shutDown";
import IconSearch from "@/assets/svg/icon_search";

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
    const handleChange = useCallback(
      (value) => {
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
      },
      [labels, handleTriggerClick, changeSegmented, navIndex],
    );

    // 滑块内容
    const options = useMemo(() => {
      return labels.map((item, index) => {
        return {
          label: (
            <div
              className={`ant-segmented-item-Content ant-segmented-item-Content${index}`}
            >
              <div>
                <div className="ant-options-item-title">{item.title}</div>
                <div className="ant-options-input">
                  <ConfigProvider
                    theme={{
                      components: {
                        Input: {
                          paddingInlineSM: 0,
                        },
                      },
                    }}
                  >
                    <Input
                      classNames={{
                        root: "ant-options-item-input",
                      }}
                      styles={{
                        input: { display: item.input ? "block" : "none" },
                      }}
                      size="small"
                      variant="borderless"
                      placeholder={item.description}
                      onFocus={() => handleChange(item.title)}
                    />
                  </ConfigProvider>
                  <div
                    className="ant-options-item-input"
                    style={{
                      display: item.input ? "none" : "block",
                      color: "#6a6a6a",
                      textAlign: "left",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
              <div className="ant-options-shutDown">
                <IconShutDown />
              </div>
            </div>
          ),
          value: item.title,
        };
      });
    }, [labels, handleChange]);
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
        <div className="rightSearch">
          <IconSearch select={navIndex !== null}></IconSearch>
        </div>
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
