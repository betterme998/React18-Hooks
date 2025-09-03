// 如果在一个useEffect中写了过多的代码，会造成阅读障碍
// 一个函数式组件中useEffect可以存在多个

import React, { memo, useEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(200);

  useEffect(() => {
    //1.修改document的ititLe

    // 当数据每次变化，都会监听一次，这没有必要，我们只需要监听一次即可
    console.log("修改title");
  });
  useEffect(() => {
    //2、对redux中数据变量监听
    console.log("监听redux中的数据");

    return () => {
      // 取消redux中数据的监听
    };
  });
  useEffect(() => {
    //3.监听eventBus 中的why事件
    console.log("监听eventBus中why事件");

    return () => {
      // 取消监听eventBus中why事件
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
