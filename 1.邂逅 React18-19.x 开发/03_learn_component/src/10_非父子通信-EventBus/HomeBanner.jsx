import React, { Component } from "react";
import eventBus from "./utils/event-bus";
// 在HomeBanner中发生的事情，我们在App中监听
export class HomeBanner extends Component {
  prevClick() {
    console.log("点击了上一个");

    eventBus.emit("prevClick", "why", 18, 1.88);
  }
  nextClick() {
    console.log("点击了下一个");
    eventBus.emit("nextClick", { nickname: "kobe", age: 19 });
  }
  render() {
    return (
      <div>
        <h2>HomeBanner</h2>
        {/* 当这两个按钮被点击时，我们希望传递给App.jsx组件里面 */}
        {/* 监听点击 */}
        <button onClick={(e) => this.prevClick()}>上一个</button>
        <button onClick={(e) => this.nextClick()}>下一个</button>
      </div>
    );
  }
}

export default HomeBanner;
