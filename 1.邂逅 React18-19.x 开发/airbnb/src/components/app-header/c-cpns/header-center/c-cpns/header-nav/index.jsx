import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";

// 将 Redux 的状态（State）和操作（Actions）映射到 React 组件的 Props
import { connect } from "react-redux";
import { changeTabsKey } from "@/store/modules/header";

import { NavWrapper } from "./style";
import { ConfigProvider, Tabs } from "antd";

import NavIcon from "@/assets/video/nav-icon"; //自己写的icon组件
import navIconConfig from "./config/navIcon.config"; //控制icon照片视频配置文件

const HeaderNav = memo(({ tabsKey, changeTabsKey }) => {
  const [activeKey, setActiveKey] = useState("1"); //当前激活的标签页
  const iconRefs = useRef({}); //存储所有图标ref的对象
  const currentIconRef = useRef(null); //当前激活图标的ref
  const [twirl, setTwirl] = useState(true); //是否为选择视频

  // 组件挂载时播放动画
  useEffect(() => {
    currentIconRef.current?.activate();
  }, [twirl]);

  // 注册ref - 将每个图标的ref存储到iconRefs中
  const registerRef = useCallback(
    (key) => (ref) => {
      if (ref) {
        iconRefs.current[key] = ref;
      }
    },
    []
  );

  // 使用 useMemo 缓存配置,这是自定义的icon组件，因为使用了navIconConfig.map方法，为了避免多次创建，所以使用useMemo缓存
  const tabItems = useMemo(() => {
    const label = ["房源", "体验", "服务"];
    return navIconConfig.map(({ posters, videoSrc, key }, i) => {
      const id = String(i + 1);
      return {
        key: id,
        label: `${label[i]}`,
        icon: (
          <NavIcon
            ref={registerRef(id)}
            poster={posters}
            videoSrc={videoSrc}
            twirl={twirl}
            keys={key}
          />
        ),
      };
    });
  }, [registerRef, twirl]);

  // Tab切换处理函数
  const handleTabChange = useCallback(
    (key) => {
      // 渲染初快速点击时取消所有图标动画
      if (!currentIconRef.current) {
        Object.keys(iconRefs.current).forEach((key) => {
          iconRefs.current[key].deactivate();
        });
      }

      // // 取消之前激活的图标状态
      if (activeKey && iconRefs.current[activeKey]) {
        iconRefs.current[activeKey].deactivate();
      }
      // 设置新的action key
      setActiveKey(key);

      // 激活新图标
      if (activeKey && iconRefs.current[key]) {
        currentIconRef.current = iconRefs.current[key];
        currentIconRef.current.activate(key);
      }
      if (twirl) {
        setTwirl(false);
      }

      // // 触发 actions 来更新 Redux store 中的状态来更新 Redux store 中的状态
      changeTabsKey(key);
    },
    [activeKey, changeTabsKey, twirl]
  );

  return (
    <NavWrapper>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemActiveColor: "#222222",
              itemSelectedColor: "#222222",
              inkBarColor: "#222222",
              horizontalItemGutter: 0,
              cardGutter: 0,
              horizontalItemPadding: "0px 0px 12px 0px",
              cardHeight: 36,
            },
          },
        }}
      >
        <Tabs
          className="nav-tabs66"
          defaultActiveKey="1"
          // activeKey={tabsKey}
          onChange={handleTabChange}
          items={tabItems}
        />
      </ConfigProvider>
    </NavWrapper>
  );
});
// 参数一
// const mapStateToProps = (state) => ({
//   tabsKey: state.header.tabsKey,
// });

// 参数二
const mapDispatchToProps = (dispatch) => ({
  changeTabsKey: (key) => {
    dispatch(changeTabsKey(key));
  },
});

export default connect(null, mapDispatchToProps)(HeaderNav);
