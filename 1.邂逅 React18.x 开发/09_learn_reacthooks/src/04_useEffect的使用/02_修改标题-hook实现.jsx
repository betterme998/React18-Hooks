// 页面的title标题总是显示counter的数字，分别使用class组件和Hook实现:
// 函数式组件实现:
import React, { memo, useState, useEffect } from "react";

const App = memo(() => {
  const [count, setCount] = useState(200);

  // 传入回调函数
  useEffect(() => {
    // 当前传入的回调函数会在组件每次被渲染完成后，自动执行
    // 这时就可以：网络请求/DOM操作/（修改标题）/事件监听
    document.title = count; //修改标题
  });

  // useEffect的解析:
  // 口 通过useEffect的Hook，可以告诉React需要在渲染后执行某些操作
  // 口 useEffect要求我们传入一个回调函数，在React执行完更新DOM操作之后，就会回调这个函数;
  // 口 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个 回调函数;

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
//认识Effect Hook

// 目前我们已经通过hook在函数式组件中定义state，那么类似于生命周期这些呢?
// 口 Effect Hook 可以让你来完成一些类似于class中生命周期的功能;
// 口 事实上，类似于网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用(Side Effects)
// 口 所以对于完成这些功能的Hook被称之为 Effect Hook;
