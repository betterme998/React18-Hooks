import React, { PureComponent } from "react";
// 类组件实现
export class CounterClass extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  increment(num) {
    this.setState({
      counter: this.state.counter + num,
    });
  }
  decrement(num) {
    this.setState({
      counter: this.state.counter - num,
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>当前计数： {counter}</h2>
        <button onClick={(e) => this.increment(1)}>+1</button>
        <button onClick={(e) => this.decrement(1)}>-1</button>
      </div>
    );
  }
}

export default CounterClass;
