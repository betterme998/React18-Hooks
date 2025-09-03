import React, { Component } from "react";
// 注意这里没有写样式，但确有样式。因为在nav-bar中引入了样式文件，那是全局样式

export class NavBar2 extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    );
  }
}

export default NavBar2;
