//
import React, { memo, useRef } from "react";

const App = memo(() => {
  const titleRef = useRef();
  const inputRef = useRef();

  function ShowTitleDom() {
    console.log(titleRef.current); //获取h2的dom
    inputRef.current.focus(); //获取焦点
  }

  return (
    <div>
      <h2 ref={titleRef}>hello World</h2>
      <input type="text" ref={inputRef} />
      <button onClick={ShowTitleDom}>查看title的dom</button>
    </div>
  );
});

export default App;
