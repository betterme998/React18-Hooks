import React, { Component } from "react";

export class AddCounter extends Component {
  addCount(count) {
    console.log(count);

    // 点击按钮时，调用父组件传递过来的方法，并传入参数
    const click = this.props.addClick;
    click(count);
  }
  render() {
    return (
      <div>
        <button onClick={(e) => this.addCount(1)}>+1</button>
        <button onClick={(e) => this.addCount(5)}>+5</button>
        <button onClick={(e) => this.addCount(-10)}>-10</button>
      </div>
    );
  }
}

export default AddCounter;
