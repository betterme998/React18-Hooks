/*
4.CSS Module 写法
■ css modules 并不是 React 特有的解决方案，而是所有使用了类似于 webpack 配置的环境下都可以使用的。
口 如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置 webpack.config.js 中的 modules: true 等。

■ React 的脚手架已经内置了 css modules 的配置:
口 .css/.less/.scss 等样式文件都需要修改成 .module.css/.module.less/.module.scss 等;
口 之后就可以引用并且进行使用了;

■ css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案

■ 但是这种方案也有自己的缺陷:
口 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的;
口 所有的className都必须使用{style.className} 的形式来编写
口 不方便动态来修改某些样式，依然需要使用内联样式的方式
*/
import React, { PureComponent } from "react";
import Home from "./home/home"; // 引入 Home 组件
import Profile from "./profile/profile";

import appStyle from "./App.module.css"; // 引入 CSS Modules 样式

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className={appStyle.title}>我是标题</h2>
        <p className={appStyle.content}>我是内容，哈哈哈</p>
        <Home /> {/* 使用 Home 组件 */}
        <Profile /> {/* 使用 Profile 组件 */}
      </div>
    );
  }
}

export default App;
