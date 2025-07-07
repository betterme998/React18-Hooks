import React, { PureComponent } from "react";
import homeStyles from "./home.module.css";

export class home extends PureComponent {
  render() {
    return (
      <div className={homeStyles.section}>
        {/* 这里不再生效，因为APP组件样式使用了module.css */}
        <h1 className="title">home标题</h1>
        <p className="content">home内容</p>
      </div>
    );
  }
}

export default home;
