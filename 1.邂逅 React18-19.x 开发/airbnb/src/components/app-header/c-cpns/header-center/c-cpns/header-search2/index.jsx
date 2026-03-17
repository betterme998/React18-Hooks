import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { SearchWarpper } from "@/components/app-header/c-cpns/header-center/c-cpns/header-search2/style";
import littleImg from "@/components/app-header/c-cpns/header-center/c-cpns/header-search2/config/littleImg.config.js";

import { Segmented, ConfigProvider, Input } from "antd";
// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeSegmented } from "@/store/modules/header";
import IconShutDown from "@/assets/svg/icon_shutDown";
import IconSearch from "@/assets/svg/icon_search";

const HeaderSearch2 = memo(
  ({
    setComponentBData,
    changeSegmented,
    open,
    handleTriggerClick,
    labels,
    tabsKey,
  }) => {
    const [navIndex, setNavIndex] = useState(null); //状态控制导航指示器位置
    const containerRef = useRef(null);
    const [state, setState] = useState(null);
    const [playedEntry, setPlayedEntry] = useState(false); // 新增：是否播放首次选中动画
    const [little, setLittle] = useState(true); //是否缩小

    // // img使用canvas绘制代码--------------------------
    // // const imageRef = useRef(null); //引用图标容器DOM元素
    // // const canvasRef = useRef(null); //绘制用canvas
    // // const rafRef = useRef(null); //requestAnimationFrame id
    // // const drawLockRef = useRef(false); //防重启

    // // 同步canvas和img尺寸
    // useEffect(() => {
    //   const image = imageRef.current;
    //   const canvas = canvasRef.current;
    //   if (!image || !canvas) return;
    //   const updateCanvasSize = () => {
    //     console.log(imageRef);
    //     // 如果 videoWidth 为 0，说明元数据还没准备好
    //     if (image.width > 0) {
    //       const dpr = window.devicePixelRatio || 1;
    //       canvas.width = image.width * dpr;
    //       canvas.height = image.clientHeight * dpr;
    //     }
    //   };
    //   // 立即尝试一次
    //   updateCanvasSize();
    //   // 监听元数据加载完成事件
    //   const handleLoadedMetadata = () => {
    //     console.log("视频元数据已加载");
    //     updateCanvasSize();
    //   };

    //   image.addEventListener("load", handleLoadedMetadata);
    //   return () => {
    //     image.removeEventListener("load", handleLoadedMetadata);
    //   };
    // }, []);
    // // 每帧绘制 img 到 canvas
    // const drawFrame = useCallback(() => {
    //   const c = canvasRef.current;
    //   const i = imageRef.current;
    //   if (!c || !i) return;

    //   const ctx = c.getContext("2d");
    //   try {
    //     ctx.clearRect(0, 0, c.width, c.height);
    //     ctx.drawImage(i, 0, 0, c.width, c.height);
    //   } catch (e) {}
    //   rafRef.current = requestAnimationFrame(drawFrame);
    // }, []); // 依赖只使用 refs，refs 在生命周期内稳定

    // const startCanvasLoop = useCallback(() => {
    //   if (drawLockRef.current) return;
    //   drawLockRef.current = true;
    //   if (rafRef.current) cancelAnimationFrame(rafRef.current);
    //   rafRef.current = requestAnimationFrame(drawFrame);
    // }, [drawFrame]); // 明确依赖 drawFrame

    // // 组件挂载时绘制img
    // useEffect(() => {
    //   const i = imageRef.current;
    //   if (!i) return;
    //   startCanvasLoop();
    // }, [tabsKey, startCanvasLoop]);

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
    const options2 = useMemo(() => {
      return littleImg.map((item, index) => {
        return {
          label: (
            <div className={`LittleItem LittleItem${index}`}>
              <button className="LittleButton LittleButtonLeft">
                <span className="LittleSpan">{item.description}</span>
                {index === 0 && (
                  <div className="LittleImgCont">
                    <img
                      // ref={imageRef}
                      className="LittleImg"
                      src={littleImg[Number(tabsKey) - 1].posterActive}
                      alt=""
                    />
                    {/* <canvas ref={canvasRef} className="nav-canvas"></canvas> */}
                  </div>
                )}

                <div className="LittleItemText">{item.text}</div>
              </button>
              {index !== 2 && <span className="LittleSeparate"></span>}
            </div>
          ),
          value: item.title,
        };
      });
    }, [tabsKey]);
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
        little={little}
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
            options={little ? options2 : options}
            size="large"
            block
            shape="round"
            onChange={handleChange}
            // 保持 value，使选中项样式正确
            value={navIndex === null ? "" : labels[navIndex].title}
          />
        </ConfigProvider>
        <IconSearch select={navIndex !== null}></IconSearch>
      </SearchWarpper>
    );
  },
);
// 参数一
const mapStateToProps = (state) => ({
  labels: state.header.label,
  tabsKey: state.header.tabsKey,
});

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeSegmented: (key) => {
    dispatch(changeSegmented(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch2);
