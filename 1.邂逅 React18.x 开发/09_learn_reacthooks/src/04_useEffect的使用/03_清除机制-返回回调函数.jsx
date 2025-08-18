// 需要清除Effect
// ■ 在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnmount中进行清除:
// 口 比如我们之前的事件总线或Redux中手动调用subscribe
// 口 都需要在componentWillUnmount有对应的取消订阅;
// 口 Effect Hook通过什么方式来模拟componentWilUnmount呢?

import React, { memo, useEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(200);

  // 负责告知react，在执行完当前组件渲染之后要执行的副作用代码
  // useEffect接收一个回调函数，这个回调函数的返回值：也是一个回调函数，用来清除副作用
  // 1.监听事件

  useEffect(() => {
    //1.修改document的ititLe
    //2、对redux中数据变量监听
    //3.监听eventBus 中的why事件

    // 当数据每次变化，都会监听一次，这没有必要，我们只需要监听一次即可
    console.log("修改title");

    // 返回值：回调函数：用来清除副作用
    // 组件重新渲染，或者组件卸载时执行
    return () => {
      console.log("清除监听redux中的数据，清除监听eventBus中why事件");
    };
  });

  // 这些useEffect可以抽成自定义hook，便于复用

  return (
    <div>
      <button onClick={(e) => setCount(count + 1)}>+1({count})</button>
    </div>
  );
});

export default App;
