import React, { memo, useCallback, useRef, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(0);
  // 多次渲染时，不会重新创建
  const nameRef = useRef();
  console.log("App");

  // 通过useRef解决闭包陷阱
  const countRef = useRef();
  countRef.current = count;
  const increment = useCallback(() => {
    setCount(countRef.current + 1);
  }, []);

  return (
    <div>
      <h2>Hello World: {count}</h2>
      <button onClick={(e) => setCount(countRef.current + 1)}>111</button>
      <button onClick={(e) => increment}>222</button>
    </div>
  );
});

export default App;
