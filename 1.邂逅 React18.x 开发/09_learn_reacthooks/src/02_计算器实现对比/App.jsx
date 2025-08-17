// 类组件和函数式组件对比
import React, { memo } from "react";
import CounterClass from "./CounterClass";
import CounterHook from "./CounterHook";

const App = memo(() => {
  return (
    <div>
      <h2>类组件实现</h2>
      <CounterClass />
      <hr />
      <CounterHook />
    </div>
  );
});

export default App;
