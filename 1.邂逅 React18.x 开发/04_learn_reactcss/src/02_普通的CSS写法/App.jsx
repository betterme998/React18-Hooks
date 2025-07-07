/*
3.普通 CSS 文件写法
■ 普通的 css 我们通常会编写到一个单独的文件，之后再进行引入。

■ 这样的编写方式和普通的网页开发中编写方式是一致的:
口 如果我们按照普通的网页标准去编写，那么也不会有太大的问题;
口 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响;
口 但是普通的 css 都属于全局的 css，样式之间会相互影响;

■ 这种编写方式最大的问题是样式之间会相互层叠掉
*/
import React, { PureComponent } from "react";
import Home from "./home/home"; // 引入 Home 组件
import Profile from "./profile/profile";
import "./App.css"; // 引入普通的 CSS 文件

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className="title">我是标题</h2>
        <p className="content">我是内容，哈哈哈</p>
        <Home /> {/* 使用 Home 组件 */}
        <Profile /> {/* 使用 Profile 组件 */}
      </div>
    );
  }
}

export default App;
