import React, { Component } from "react";

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
  changeText() {}
  increment() {
    // 1.当我们多次调用this.setState时,React只会执行一次更新操作
    /*
    react会将this.setState放入队列当中，会在合适的时机进行合并更新操作，而不是多次更新。

    */
    //传出入对象时，this.state.counter为0，因为对象被创建出来时，this.state.counter就已经是0了
    // this.setState({
    //   counter: this.state.counter + 1,
    // });
    // this.setState({
    //   counter: this.state.counter + 1,
    // });
    // this.setState({
    //   counter: this.state.counter + 1,
    // });

    // 传入函数时，当前的回调函数会将之前的state和props传递进来
    // 调用三次后，会将state的值加3，也会合并更新，只会调用一次render函数
    // 这里的参数是之前的state
    this.setState((state) => {
      return {
        counter: state.counter + 1,
      };
    });
    // 会传入上一个state
    this.setState((state) => {
      return {
        counter: state.counter + 1,
      };
    });
    // 会传入上一个state
    this.setState((state) => {
      return {
        counter: state.counter + 1,
      };
    });
  }
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
