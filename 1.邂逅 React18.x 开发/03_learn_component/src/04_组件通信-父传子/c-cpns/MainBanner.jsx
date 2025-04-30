import React, { Component } from "react";
// 引入prop-types库来验证传入的props类型
import PropTypes from "prop-types";

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

// 当没有使用ts等类型检查工具时，
// 可以使用prop-types来验证传入的props类型
// 使用propTypes  （第三方库）来验证传入的props类型
MainBanner.protoType = {
  banners: PropTypes.array.isRequired, // 数组类型，必传
  title: PropTypes.string, // 字符串类型，非必传
};

export default MainBanner;
