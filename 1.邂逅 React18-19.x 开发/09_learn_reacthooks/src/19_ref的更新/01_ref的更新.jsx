// 函数式组件绑定ref不再需要forwardRef了
import React, { memo, useRef } from "react";

const App = memo(() => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>react19</h1>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>按钮</button>
    </div>
  );
});

const MyInput = memo(({ ref }) => {
  return (
    <div>
      <h2>我是子组件</h2>
      <input type="text" ref={ref} />
    </div>
  );
});

export default App;
