// useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已
// 口 useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新;
// 口 useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新，
import React, { memo, useEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(100);

  useEffect(() => {
    console.log("useEffect");
    // 会出现闪烁现象，因为useEffect会在DOM更新后执行
    if (count === 0) {
      setCount(Math.random() + 99);
    }
  });

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(0)}>设置为0</button>
    </div>
  );
});

export default App;
