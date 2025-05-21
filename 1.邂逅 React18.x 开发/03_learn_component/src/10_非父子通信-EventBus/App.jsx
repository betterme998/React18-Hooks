import React, { Component } from "react";
import Home from "./Home";
// 第三方组件库
import eventBus from "./utils/event-bus";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      age: 0,
      height: 0,
    };
  }
  // 1.等待组件挂载完成，监听一些事件
  componentDidMount() {
    // eventBus.on("prevClick", (name, age, height) => {
    //   console.log("prevClick", name, age, height);
    //   // 默认是没有数据的，一点击，就会有数据
    //   // 对象增强语法
    //   this.setState({ name, age, height });
    // });
    eventBus.on("prevClick", this.bannerPrevClick, this);
    eventBus.on("nextClick", this.bannerNextClick, this);
  }
  // 写出去，为了让组件卸载时，取消事件监听
  bannerPrevClick(name, age, height) {
    // 默认是没有数据的，一点击，就会有数据
    // 对象增强语法
    this.setState({ name, age, height });
  }
  bannerNextClick(data) {
    console.log("nextClick", data);
  }

  // 组件卸载时，取消事件监听
  componentWillUnmount() {
    eventBus.off("prevClick", this.bannerPrevClick);
    eventBus.off("nextClick", this.bannerNextClick);
  }

  render() {
    const { name, age, height } = this.state;
    return (
      <div>
        <h2>
          App Component:{name}-{age}-{height}
        </h2>
        <Home />
      </div>
    );
  }
}

export default App;
