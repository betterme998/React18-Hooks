import React, { PureComponent } from "react";
import "./home.css";

export class home extends PureComponent {
  render() {
    return (
      <div className="section">
        {/* 没有引入css文件，但是有样式。因为css是全局文件 */}
        <h1 className="title">home标题</h1>
        <p className="content">home内容</p>
      </div>
    );
  }
}

export default home;
