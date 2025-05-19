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
  // 父组件使用子组件数据，
  getTabItem(item) {
    if (item === "流行") {
      return <span>{item}</span>;
    } else if (item === "推荐") {
      return <button>{item}</button>;
    } else {
      return <i>{item}</i>;
    }
  }
  render() {
    const { titles, tabIndex } = this.state;
    return (
      <div className="app">
        {/* 子传父，父传子 */}
        <TabControl
          tabcon={(index) => this.tabIndexCont(index)}
          titles={titles}
          // 当父组件内部需要使用子组件的数据，那么父组件需要传递一个，子组件通过调用函数并传入数据 */
          itemType={(item) => this.getTabItem(item)}
        />
        {/* 子组件内部索引发送改变，父组件tabIndex也要变 */}
        <h1>{titles[tabIndex]}</h1>
      </div>
    );
  }
}

export default App;
