import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
/*
Portals 的使用
■ 某些情况下，我们希望渲染的内容独立于父组件，甚至是独立于当前挂载到的 DOM 元素中(默认都是挂载到 id 为 root 的 DOM 元素上的)

在public/index.html 中添加一个 id 为 why 的元素，
在public/index.html 中添加一个 id 为 Modal 的元素，


下面将h2元素渲染到 id 为 why 的 DOM 元素中

createPortal接收两个参数，渲染的内容，挂载的节点

*/
export class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h1>App H1</h1>
        {createPortal(
          <p>这个子节点被放置在 document why 中。</p>,
          document.querySelector("#why")
        )}

        {/* 2.Modal组件 所有传递到Modal的子节点，都会被渲染到 id为Modal的节点中 */}
        {/* 所有在Modal标签内的子节点，都会以插槽的方式传入组件的props.children属性中 */}
        <Modal>
          <h2>我是标题</h2>
          <p>我是内容，哈哈哈</p>
        </Modal>
      </div>
    );
  }
}

export default App;
