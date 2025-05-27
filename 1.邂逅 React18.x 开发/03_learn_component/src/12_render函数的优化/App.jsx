import React, { Component } from "react";
import Home from "./Home";
import Recommend from "./Recommend";
/*
当页面加载时，render函数会被调用，其中的组件
<Home />
<Recommend />
当中的render也会被调用。

当我们修改了App组件的state时，render函数又会被调用，
其他子组件当中的render也会被调用。

可通过shouldComponentUpdate来控制子组件的render函数是否被调用。
接收两个参数：nextProps和nextState，最新的props和state。
新旧值对比，如果有变化，则返回true，不变则返回false。

子组件当中也可以使用shouldComponentUpdate来控制子组件的render函数是否被调用。

*/
export class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "Hello World",
      counter: 0,
    };
  }

  /*
  shouldComponentUpdate
  ■ React 给我们提供了一个生命周期方法 shouldComponentUpdate(很多时候，我们简称为 SCU)，这个方法接受参数，并且需要有返回值:
  ■ 该方法有两个参数:
  口 参数-:nextProps 修改之后，最新的 props 属性
  口 参数二:nextState 修改之后，最新的 state 属性
  */
  //控制 render 方法是否被调用
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.message !== nextState.message ||
      this.state.counter !== nextState.counter
    ) {
      return true; // 需要重新渲染
    }
    return false; // 不需要重新渲染
  }
  changeText() {
    this.setState({ message: "你好啊，李银河" });

    // 当修改的值和原来的值一样时，就不会重新渲染了。
    // 通过shouldComponentUpdate
    // this.setState({ message: "Hello World" });
  }
  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }
  render() {
    const { message, counter } = this.state;
    console.log("App render");

    return (
      <div>
        <h2>
          App-{message}-{counter}
          <button onClick={(e) => this.changeText()}>修改文本</button>
          <button onClick={(e) => this.increment()}>counter+1</button>
          {/* 父组件传入值给子组件 */}
          <Home message={message} />
          <Recommend counter={counter} />
        </h2>
      </div>
    );
  }
}

export default App;
