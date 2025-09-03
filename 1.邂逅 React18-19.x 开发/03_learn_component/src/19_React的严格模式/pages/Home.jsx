import React, { PureComponent } from "react";

export class Home extends PureComponent {
  // UNSAFE_componentWillMount() {
  // 报错，这是过时的方法，在React 16.3中被废弃。

  //   console.log("Home componentWillMount");
  // }
  componentDidMount() {
    // 执行两次，严格模式下，生命周期方法会被调用两次
    console.log("Home componentDidMount 执行两次");
  }
  render() {
    console.log("Home render");

    return (
      <div>
        {/* 报错不能这样用ref */}
        {/* <h2 ref="title">Home Title</h2> */}

        <h2>Home Title</h2>
      </div>
    );
  }
}

export default Home;
