// use 是一个 React API，它可以让你读取类似于 Promise 或 context 的资源的值。
// 可以在循环和条件语句（如 if）中调用 use。但需要注意的是，调用 use 的函数仍然必须是一个组件或 Hook。
import React, { memo, Suspense, use } from "react";
import axios from "axios";

// .then返回的是一个promise
const dataPromise = axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.data);

const ReactDemo = memo(() => {
  const data = use(dataPromise); //读取到promise resolve的值
  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
});

const App = memo(() => {
  // 当使用 Promise 调用 use API 时，它会与 Suspense 和 错误边界 集成
  return (
    // 就是在组件加载的时候，如果数据还没有加载完成，就显示loading..
    <Suspense fallback={<div>loading..</div>}>
      <ReactDemo />
    </Suspense>
  );
});

export default App;
