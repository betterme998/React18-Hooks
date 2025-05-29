import React, { PureComponent, createRef } from "react";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  titleRef = createRef(); // 使用createRef创建一个ref对象

  getNativeDOM() {
    // 1方式一：.在React元素上绑定一个ref字符串
    // console.log(this.refs.why); // 不推荐，已弃用
    // 2.方式二.提前创建好ref对尔，createRef()，将创建出来的对象绑定到元素
    console.log(this.titleRef.current);
  }
  render() {
    return (
      <div>
        {/* 1.在React元素上绑定一个ref字符串 */}
        <h2 ref="why">Hello World</h2>
        {/* 2.使用createRef创建一个ref对象 */}
        {/* <h2 ref={this.titleRef}>2Hello World</h2> */}
        <button onClick={(e) => this.getNativeDOM()}>获取DOM</button>
      </div>
    );
  }
}

export default App;
