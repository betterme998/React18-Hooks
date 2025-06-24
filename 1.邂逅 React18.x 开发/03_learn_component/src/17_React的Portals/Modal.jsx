import { PureComponent } from "react";

import { createPortal } from "react-dom";
/*
■ Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案:
口第一个参数(child)是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment;
口第二个参数(container)是一个 DOM 元素;
*/
export class Modal extends PureComponent {
  render() {
    return createPortal(this.props.children, document.querySelector("#modal"));
  }
}

export default Modal;
