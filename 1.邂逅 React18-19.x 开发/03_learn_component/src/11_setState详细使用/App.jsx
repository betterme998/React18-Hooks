import React, { Component } from "react";
import { flushSync } from "react-dom";

function Hello(props) {
  return <h1>{props.message}</h1>;
}

export class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "Hello World",
      counter: 0,
    };
  }
  changeText() {
    setTimeout(() => {
      // 在react18之前，setTimeout中setState是同步的，但是在react18之后变成了异步的
      // 在react18之后，setTimeout中setState在事件处理函数中是异步的（批处理：当有多个setState的时候，会放到一个render函数中执行）
      // 只有在reater事件当中才会批处理
      // 但是如果我们在setTimeout中使用flushSync，那么就可以让setState变成同步的了
      flushSync(() => {
        this.setState({ message: "你好啊，李银河" });
      });
      console.log(this.state.message);
    });
  }
  increment() {}
  render() {
    const { message, counter } = this.state;
    console.log(
      "render函数被调用了，多次调用setState，render函数只会被调用一次"
    );

    return (
      <div>
        <h2>message: {message}</h2>
        <button onClick={(e) => this.changeText()}>修改文本</button>
        <h2>当前计数: {counter}</h2>
        <button onClick={(e) => this.increment()}>counter+1</button>

        {/*如果this.setState是同步，给子组件传入值,不能保持一致，因为点击按钮后message立马被改掉，但是rander函数还没有被执行，导致父组件数据更新了，子组件数据还是旧的*/}
        <Hello message={message} />
      </div>
    );
  }
}

export default App;
