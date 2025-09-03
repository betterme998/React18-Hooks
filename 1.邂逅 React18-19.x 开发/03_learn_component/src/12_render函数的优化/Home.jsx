import React, { Component } from "react";

export class Home extends Component {
  // 当有自己数据时，父组件传递的props需要在constructor和super中以props的形式接收
  constructor(props) {
    super(props);

    this.state = {
      friends: ["Alice", "Bob", "Charlie"],
    };
  }
  // 数据更新时是否需要重新渲染的声明周期钩子函数
  // class组件继承PureComponent后，会自动对比新旧props和state，
  // 如果新旧值相同，则不会调用render方法。
  // shouldComponentUpdate(newProps, newState) {
  //   // 自己对比state是否发生改变:this.state 和 newState

  //   // 子组件当中需要判断父组件传递的props是否发生改变:this.props 和 newProps
  //   if (this.props.message !== newProps.message) {
  //     return true; // 需要重新渲染
  //   }

  //   return false;
  // }
  render() {
    console.log("Home render");

    return (
      <div>
        {/* 注意shouldComponentUpdate也影响props的更新 */}
        <h2>Home Page：{this.props.message}</h2>
      </div>
    );
  }
}

export default Home;
