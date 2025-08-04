import React, { PureComponent } from "react";
import store from "../store";

export class home extends PureComponent {
  constructor() {
    super();

    this.state = {
      // 订阅store，只有数据变化时才会更新state的值，
      // 第一次state的值要用下面方法取
      counter: store.getState().counter,
    };
  }
  componentDidMount() {
    // 订阅store的变化
    store.subscribe(() => {
      const state = store.getState();
      this.setState({ counter: state.counter });
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <div>
          <button>+1</button>
          <button>+5</button>
          <button>+8</button>
        </div>
      </div>
    );
  }
}

export default home;
