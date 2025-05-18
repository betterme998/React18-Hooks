import React, { Component } from "react";
import NavBar from "./nav-bar";
import NavBar2 from "./nav-bar2";

export class App extends Component {
  render() {
    return (
      <div>
        {/* 1.实现插槽方法一：组件的 children 子元素;， */}
        <NavBar>
          {/* 这些内容会被添加到 NavBar实例 -> this.props.children */}
          {/* 当组件开始标签-结束标签之间只有一个子元素时，this.props.children就是这个元素 */}
          {/* 当组件开始标签-结束标签之间只有多个子元素时，this.props.children就是数组 */}
          <button>按钮</button>
          <h2>我是标题</h2>
          <i>斜体文字</i>
        </NavBar>

        {/* 2.使用props实现插槽 */}
        <NavBar2
          // 父传子组件的插槽内容，通过props传递到子组件中，并通过插槽名称区分放置位置
          leftSlot={<button>按钮</button>}
          centerSlot={<h2>我是标题</h2>}
          rightSlot={<i>斜体文字</i>}
        />
      </div>
    );
  }
}

export default App;
