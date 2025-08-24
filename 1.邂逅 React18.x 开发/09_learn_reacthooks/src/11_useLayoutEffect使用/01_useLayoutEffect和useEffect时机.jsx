// useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已
// 口 useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新;
// 口 useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新，
import React, { memo, useEffect, useLayoutEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
  });

  useLayoutEffect(() => {
    // 在渲染内容更新到DOM之前执行
    console.log("useLayoutEffect");
  });
  console.log("render");

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
