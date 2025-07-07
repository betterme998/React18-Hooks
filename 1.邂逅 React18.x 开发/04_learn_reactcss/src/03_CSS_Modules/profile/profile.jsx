import React, { PureComponent } from "react";

export class profile extends PureComponent {
  render() {
    // 在home组件在也有clasname="section"的div，并且home组件给section加了样式，所以这里也会影响
    // 即便没有写样式
    return <div className="section">Profile Section</div>;
  }
}

export default profile;
