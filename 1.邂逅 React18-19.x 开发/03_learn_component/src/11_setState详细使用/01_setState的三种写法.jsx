import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "Hello World",
      counter: 0,
    };
  }
  changeText() {
    // 1.setState 更多用法
    /*
    1.基本使用
    this.setState传入了一个新对象{}，相当于创建了一个新的对象，message值为aaaaa
    问题：那它是怎么修改原对象的message值的呢？
    答案：Object.assign(this.state, {})，相当于合并了两个对象。新属性就会覆盖旧属性.
    然后在合适的时机调用render方法，重新渲染组件
    this.setState({
      message: "你好啊，李银河",
    });
    */
    /*
    2.setState可以传入一个回调函数
    好处一：可以在回调函数中编写新的state的逻辑
    好处二：当前的回调函数会将之前的state和props传递进来
    this.setState((state, props) => {
      // 1.编写一些新的state的逻辑
      // 2.可以获取之前的state和props值
      console.log(this.state.message, this.props);

      return {
        message: "你好啊，李银河",
      };
    });
    */
    /*
    3.setState在React的事件处理中是一个异步调用
    */
    //传入第二个参数：callback函数：当数据更新之后，会执行这个回调函数
    this.setState({ message: "你好啊，李银河" }, () => {
      console.log("+++++++:", this.state.message);
    });
    console.log("-----:", this.state.message);
    // 当执行到41行的时候，state还没有合并，所以打印的还是Hello World
    // 如果希望在数据更新之后（数据合并）,获取到对应的结果执行一些逻辑
    // 那么可以在setState中传入第二个参数：callback函数,
  }
  increment() {}
  render() {
    const { message, counter } = this.state;

    return (
      <div>
        <h2>message: {message}</h2>
        <button onClick={(e) => this.changeText()}>修改文本</button>
        <h2>当前计数: {counter}</h2>
        <button onClick={(e) => this.increment()}>counter+1</button>
      </div>
    );
  }
}

export default App;
