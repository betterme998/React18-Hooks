// 页面的title标题总是显示counter的数字，分别使用class组件和Hook实现:
// class组件实现:
import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      counter: 100,
    };
  }

  componentDidMount() {
    document.title = this.state.counter;
  }
  /**
   * 当组件更新后执行。
   *
   * 将文档的标题更新为当前计数器的值。
   */
  componentDidUpdate() {
    document.title = this.state.counter;
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h2>计数： {counter}</h2>
        <button onClick={(e) => this.setState({ counter: counter + 1 })}>
          +1
        </button>
      </div>
    );
  }
}

export default App;
