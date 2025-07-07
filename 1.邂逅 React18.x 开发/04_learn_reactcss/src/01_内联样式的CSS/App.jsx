/*
2.内联样式 CSS 写法

■ 内联样式是官方推荐的一种 css 样式的写法:
口 style 接受一个采用小驼峰命名属性的 JavaScript 对象，，而不是 CSS 字符串,
口 并且可以引用 state 中的状态来设置相关的样式;

■ 内联样式的优点:
口 1.内联样式,样式之间不会有冲突
口 2.可以动态获取当前 state 中的状态

■ 内联样式的缺点:
口 1.写法上都需要使用驼峰标识
口 2.某些样式没有提示
口 3.大量的样式,代码混乱
口 4.某些样式无法编写(比如伪类/伪元素)

■ 所以官方依然是希望内联合适和普通的css来结合编写;
*/
import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      color: "red",
      fontSize: 16,
    };
  }
  addTitleSize() {
    this.setState({
      fontSize: this.state.fontSize + 1,
    });
  }
  render() {
    const { color, fontSize } = this.state;

    return (
      <div>
        <button onClick={(e) => this.addTitleSize()}>增加titleSize</button>
        <h2 style={{ color: color, fontSize: "20px" }}>我是标题</h2>
        <p style={{ color: "blue", fontSize: `${fontSize}px` }}>
          我是内容，哈哈哈
        </p>
      </div>
    );
  }
}

export default App;
