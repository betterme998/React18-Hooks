// refs
// react19写法
// 针对的问题：一个按钮是动态的，针对这个动态按钮添加绑定事件
import React, { memo, useState } from "react";

const App = memo(() => {
  const [showButton, setShowButton] = useState(true);

  const setRef = (ref) => {
    if (ref) {
      const handler = () => console.log("按钮被点击");
      ref.addEventListener("click", handler);
      return () => {
        console.log("清理事件监听器");
        ref?.removeEventListener("click", handler);
      };
    }
  };

  return (
    <div>
      <h1>react19</h1>
      <button onClick={() => setShowButton(!showButton)}>显示按钮</button>
      {/* 给它动态绑定事件 */}
      {showButton && <button ref={setRef}>点击我</button>}
    </div>
  );
});

export default App;
