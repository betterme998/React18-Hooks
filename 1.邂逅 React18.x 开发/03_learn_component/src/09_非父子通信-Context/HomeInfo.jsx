import React, { Component } from "react";
// 1.引入上下文
import ThemeContext from "./context/theme-context";

export class HomeInfo extends Component {
  render() {
    // 4.第四部操作：获取数据，并使用数据
    console.log(this.context); // { color: "red" }

    return <div>HomeInfo: {this.context.color}</div>;
  }
}

// 2.指定上下文类型
// 3.第三步操作：设置组件的contextType为某一个类型
HomeInfo.contextType = ThemeContext;

export default HomeInfo;
