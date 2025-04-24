import React from "react";
// 生命周期
class HelloWorld extends React.Component {
  // 1.执行构造方法
  constructor() {
    super();
    console.log("constructor");

    this.state = {
      message: "Hello World!",
    };
  }

  changeText() {
    this.setState({
      message: "你好啊，李银河",
    });
  }
  // 2.执行render函数
  render() {
    console.log("render");
    const { message } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        <button onClick={(e) => this.changeText()}>修改文本</button>
      </div>
    );
  }
  // 3.组件被渲染到DOM：被挂载到DOM
  componentDidMount() {
    console.log("componentDidMount");
  }

  // 4.组件的DOM被更新完成：DOM发生了更新
  componentDidUpdate(prevProps, prevState, snapshot) {
    // prevProps: 上一次的props
    // prevState: 上一次的state
    // snapshot: 快照，在componentDidUpdate中使用
    // 这个快照是getSnapshotBeforeUpdate的返回值，在componentDidUpdate中使用
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
  }

  // 5.组件将要卸载：组件被销毁
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // 不常用的生命周期补充
  // 6.组件的props或state发生了变化,是否需要重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  // 在更新数据前执行的生命周期函数，是否需要获取快照，就是保存数据
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return {
      // 屏幕滚动的位置。再改变数据前，保存屏幕滚动的位置，这个数据会在componentDidUpdate中使用，componentDidUpdate可以拿到返回值

      scrollPosition: 1000,
    };
  }
}

export default HelloWorld;
