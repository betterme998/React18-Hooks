import React, { PureComponent, createRef } from "react";

class HelloWorld extends PureComponent {
  // 父组件拿到子组件实例可以调用子组件的方法
  test() {
    console.log("HelloWorld test method called");
  }
  render() {
    return <h2>1Hello World</h2>;
  }
}

export class App extends PureComponent {
  constructor() {
    super();
    this.hwRef = createRef(); // 创建一个ref对象，用于获取HelloWorld组件实例
  }

  getComputed() {
    console.log(this.hwRef.current); // 获取HelloWorld组件实例
    this.hwRef.current.test(); // 调用HelloWorld组件的test方法
  }
  render() {
    return (
      <div>
        {/* 1.绑定  ref属性，获取组件实例 */}
        <HelloWorld ref={this.hwRef} />
        <button onClick={(e) => this.getComputed()}>获取组件实例</button>
      </div>
    );
  }
}

export default App;
