/*
■某些情况，我们也需要子组件向父组件传递消息:
口 在vue中是通过自定义事件来完成的;
口在React中同样是通过props传递消息，只是让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可
我们这里来完成一个案例:
口 将计数器案例进行拆解，
口将按钮封装到子组件中:CounterButton;
口 CounterButton发生点击事件，将内容传递到父组件中，修改counter的值;
*/
import React, { Component } from "react";
import { AddCounter } from "./AddCounter";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: 100,
    };
  }

  changeCounter(count) {
    // 子组件调用父组件的方法，并传入参数count，修改状态值
    this.setState({
      counter: this.state.counter + count,
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>当前计数：{counter}</h2>
        {/* 子传父，通过键值对传递一个箭头函数给子组件，在子组件中调用这个函数并传递参数 */}
        <AddCounter
          addClick={(count) => {
            this.changeCounter(count);
          }}
        />
      </div>
    );
  }
}

export default App;
