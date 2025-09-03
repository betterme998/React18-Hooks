import React, { PureComponent, createRef, forwardRef } from "react";
/*
ref 的转发
■ 在前面我们学习 ref 时讲过，ref 不能应用于函数式组件:
口 因为函数式组件没有实例，所以不能获取到对应的组件对象

■ 但是，在开发中我们可能想要获取函数式组件中某个元素的 DOM，这个时候我们应该如何操作呢?
口 方式一:直接传入 ref 属性(错误的做法)
口 方式二:通过 forwardRef 高阶函数;
*/

// 2.通过forwardRef高阶函数创建组件，并通过ref属性获取组件实例
// 接收两个参数：props和ref
// 当绑定ref属性时，会将ref传递给forwardRef的第二个参数

const HelloWorld = forwardRef(function (props, ref) {
  return (
    <div>
      {/* 获取函数组件中某个元素的DOM */}
      <h1 ref={ref}>Hello World</h1>
      <p>哈哈哈</p>
    </div>
  );
});

export class App extends PureComponent {
  constructor() {
    super();
    this.hwRef = createRef(); // 创建一个ref对象，用于获取HelloWorld组件实例
  }

  getComputed() {
    console.log(this.hwRef.current); // 获取HelloWorld组件实例
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
