import React, { memo, useState, useCallback } from "react";

const App = memo(() => {
  const [count, setCount] = useState(0);

  // 每次组件渲染都会重新创建函数
  // 思考一下：多次渲染导致函数重复创建，之前的函数会被销毁吗？
  // 会被销毁，因为函数没有引用指向它
  // 虽然会被销毁，但是每次都得重新创建

  // 这里传递的函数依旧会被重新创建，只是传递给了useCallback
  const increment = useCallback(function () {
    setCount(count + 1);
  });

  return (
    <div>
      <h2>计数：{count}</h2>
      <button onClick={increment}>+1</button>
    </div>
  );
});

export default App;
