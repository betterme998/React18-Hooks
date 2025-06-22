import { useContext } from "react";
import ThemeContext from "../context/theme_context";

// 高阶组件接收组件返回组件
// 高阶组件，获取上下文数据，传入组件中
function withTheme(OriginComponent) {
  return (props) => {
    // useContext 是一个 React Hook，可以让你读取和订阅组件中的 context。
    const value = useContext(ThemeContext);
    console.log(value);

    return <OriginComponent {...value} {...props} />;
  };
}

export default withTheme;
