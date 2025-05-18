import React, { Component } from "react";
import "./style.css";

export class TabControl extends Component {
  constructor() {
    super();
    this.state = {
      // 记录tab的索引值，默认为0，用于控制选中哪个tab
      currentIndex: 0,
    };
  }

  // 点击tab项的处理函数
  // 功能1：点击tab项时，改变当前选中的tab索引
  // 功能2：调用父组件传入的回调函数，将当前选中的tab索引传递给父组件
  // 注意：这里的index指的是点击的tab项在数组titles中的索引值
  itemClick(index) {
    const click = this.props.tabcon;

    // 1
    this.setState({
      currentIndex: index,
    });
    // 2
    click(index);
  }

  render() {
    const { titles } = this.props;
    const { currentIndex } = this.state;
    return (
      <div className="tab-control">
        {titles.map((item, index) => {
          return (
            <div
              className={`item ${index === currentIndex ? "active" : ""}`}
              key={item}
              onClick={(e) => this.itemClick(index)}
            >
              <span className="text">{item}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TabControl;
