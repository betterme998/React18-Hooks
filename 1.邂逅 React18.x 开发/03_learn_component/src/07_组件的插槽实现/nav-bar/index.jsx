import React, { Component } from "react";
import "./style.css";

export class NavBar extends Component {
  render() {
    // 实现插槽方法一：组件的 children 子元素;
    const { children } = this.props;

    return (
      <div className="nav-bar">
        {/* 多个 children子元素是一个数组，否则就是一个元素 */}
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    );
  }
}

export default NavBar;
