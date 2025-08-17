// 页面的title标题总是显示counter的数字，分别使用class组件和Hook实现:
// 函数式组件实现:
import React, { memo, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(200);

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
