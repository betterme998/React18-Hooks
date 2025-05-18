import React, { Component } from "react";
import TabControl from "./TabControl";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      titles: ["流行", "推荐", "热门"],
      tabIndex: 0,
    };
  }
  // 子组件传递过来的索引值，改变父组件的tabIndex
  // 根据tabIndex的值来渲染不同的内容
  tabIndexCont(index) {
    this.setState({
      tabIndex: index,
    });
  }
  render() {
    const { titles, tabIndex } = this.state;
    return (
      <div className="app">
        {/* 子传父，父传子 */}
        <TabControl
          tabcon={(index) => this.tabIndexCont(index)}
          titles={titles}
        />
        {/* 子组件内部索引发送改变，父组件tabIndex也要变 */}
        <h1>{titles[tabIndex]}</h1>
      </div>
    );
  }
}

export default App;
