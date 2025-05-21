import { ThemeContext } from "./context/theme-context";
import { useContext } from "react";
// 函数数组
/*
函数式组件非父子通信，通过Context上下文通信
使用useContext获取数据

*/
function HomeBanner() {
  // useContext 是一个 React Hook，可以让你读取和订阅组件中的 context。
  const theme = useContext(ThemeContext);
  console.log(theme);

  return <div>HomeBanner </div>;
}

export default HomeBanner;
