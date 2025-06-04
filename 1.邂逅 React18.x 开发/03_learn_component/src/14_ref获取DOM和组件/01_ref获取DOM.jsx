import React, { PureComponent, createRef } from "react";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {};
    this.titleRef2 = null;
    this.titleRef = createRef(); // 使用createRef创建一个ref对象
  }

  getNativeDOM() {
    // 1方式一：.在React元素上绑定一个ref字符串
    // console.log(this.refs.why); // 不推荐，已弃用
    // 2.方式二.提前创建好ref对尔，createRef()，将创建出来的对象绑定到元素
    // console.log(this.titleRef.current);
    // 3.方式三：在回调函数中使用ref对象,在组件挂载完成后，通过回调函数获取DOM元素
    console.log(this.titleRef2); // 回调函数中获取DOM元素
  }
  render() {
    return (
      <div>
        {/* 1.在React元素上绑定一个ref字符串 */}
        {/* <h2 ref="why">Hello World // 不推荐，已弃用</h2> */}
        {/* 2.使用createRef创建一个ref对象 */}
        <h2 ref={this.titleRef}>2Hello World</h2>
        {/* 3.使用回调函数 */}
        <h2
          ref={(e) => {
            this.titleRef2 = e;
          }}
        >
          3Hello World
        </h2>
        <button onClick={(e) => this.getNativeDOM()}>获取DOM</button>
      </div>
    );
  }
}

export default App;
