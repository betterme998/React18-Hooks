import React, { Component } from "react";

export class MainBanner extends Component {
  // 子组件在构造函数中通过props参数接收父组件传来的属性，
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { banners, title } = this.props;
    return (
      <div>
        <h2>封装一个轮播图: {title}</h2>
        <ul>
          {banners.map((item) => {
            return <li key={item.acm}>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default MainBanner;
