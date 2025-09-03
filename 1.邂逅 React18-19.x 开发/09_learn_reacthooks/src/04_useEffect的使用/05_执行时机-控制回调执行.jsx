// 数据变化就会执行useEffect，但是有些操作我们只要执行一次，比如网络请求，监听事件
// 我们只需要在组件第一次完成渲染时执行一次就可以了
// Effect性能优化
// ■ 我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢?
// 口 useEffect实际上有两个参数:
// 口 参数一:执行的回调函数
// 口 参数二:该useEffect在哪些state发生变化时，才重新执行;(受谁的影响)
import React, { memo, useEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(200);

  useEffect(() => {
    console.log("修改title");
  }, []);
  useEffect(() => {
    console.log("监听redux中的数据");

    return () => {};
    // 接收第二个参数，空数组[],表示组件第一次渲染时执行，之后就不再执行了
  }, []);
  useEffect(() => {
    console.log("监听eventBus中why事件");

    return () => {};
  }, []);
  useEffect(() => {
    console.log("发生网络请求");

    return () => {
      console.log("会在组件卸载时，才会执行一次");
    };
  }, []);

  return (
    <div>
      <button onClick={(e) => setCount(count + 1)}>+1({count})</button>
    </div>
  );
});

export default App;
