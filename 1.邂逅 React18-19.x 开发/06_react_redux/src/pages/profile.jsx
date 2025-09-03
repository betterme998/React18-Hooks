import React, { PureComponent } from "react";
import store from "../store";
import { subNumberAction } from "../store/counter";

export class profile extends PureComponent {
  constructor() {
    super();

    this.state = {
      // 订阅store，只有数据变化时才会更新state的值，
      // 第一次state的值要用下面方法取
      counter: store.getState().counter.counter,
    };
  }
  subNumber(num) {
    // 触发action，修改store中的数据
    store.dispatch(subNumberAction(num));
  }
  componentDidMount() {
    // 订阅store的变化
    store.subscribe(() => {
      const state = store.getState().counter;
      this.setState({ counter: state.counter });
    });
  }
  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>profile Counter: {counter}</h2>
        <div>
          <button onClick={(e) => this.subNumber(1)}>-1</button>
          <button onClick={(e) => this.subNumber(5)}>-5</button>
          <button onClick={(e) => this.subNumber(8)}>-8</button>
        </div>
      </div>
    );
  }
}

export default profile;
