import React from "react";
import HelloWorld from "./HelloWorld";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowHW: true,
    };
  }
  switchHWShow() {
    this.setState({ isShowHW: !this.state.isShowHW });
  }
  render() {
    const { isShowHW } = this.state;
    return (
      <div>
        <h1>哈哈哈</h1>
        {/* 移除组件 */}
        <button onClick={(e) => this.switchHWShow()}>切换</button>
        {/* 每次使用组件时，都会创建一个新组件实例  */}
        {isShowHW && <HelloWorld />}
      </div>
    );
  }
}

export default App;
