import React, { memo, useState } from "react";

const App = memo(() => {
  const [message, setMessage] = useState("Hello World");
  // const [banners, setBanners] = useState([]);

  // setMessage拿到的是react内部提供的函数，我们执它时，本质上是执行内部的函数
  // setMessage("你好啊，李银河！")：当传入新值时，内部会存储这个状态值
  // 一旦发现执行了setMessage函数，内部会重新调用函数组件
  // 调用的时候发现又执行了useState，就会把保存的最新状态值赋值给message
  // 所以就能渲染新的值了

  function changeMessage(event) {
    setMessage("你好啊，李银河！");
  }

  return (
    <div>
      <h2>App: {message}</h2>
      <button onClick={changeMessage}>修改文本</button>
    </div>
  );
});

export default App;

// useState解析
// 那么我们来研究一下核心的一段代码代表什么意思:
// 口 useState来自react，需要从react中导入，它是一个hook;
//    参数:初始化值，如果不设置为undefined;
//    返回值:数组，包含两个元素
//      >元素一:当前状态的值(第一调用为初始化值);
//      >元素二:设置状态值的函数
//口 点击button按钮后，会完成两件事情:
//    调用setCount，设置一个新的值，
//    组件重新渲染，并且根据新的值返回DOM结构

// 自定义hooks
// hooks必须顶层调用
// 但是使用它们会有两个额外的规则:
//口 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用.
//口 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用

//-------------------------------------------------------------------------
// State Hook的API就是 useState，我们在前面已经进行了学习:
// 口 useState会帮助我们定义一个 state变量，useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。
//  √ 一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。
// 口 useState接受唯-一个参数，在第一次组件被调用时使用来作为初始化值。(如果没有传递参数，那么初始化值为undefined)。
// 口 useState的返回值是一个数组，我们可以通过数组的解构，来完成赋值会非常方便。
