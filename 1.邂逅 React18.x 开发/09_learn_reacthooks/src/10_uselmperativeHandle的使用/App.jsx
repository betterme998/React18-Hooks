// ref绑定子组件：暴漏部分操作权限给父组件使用:useImperativeHandle
import React, { memo, useRef, useImperativeHandle } from "react";

const HelloWorld =
  // 子组件通过props接收父组件传递的ref：这里解构props拿到ref
  memo(({ ref }) => {
    const inputRef = useRef();

    // 子组件对父组件传入的ref进行处理
    useImperativeHandle(ref, () => {
      // 返回的对象会绑定到ref的current值上
      // 意味着，在父组件中拿到的ref.current就是这里返回的对象
      return {
        focus() {
          console.log("focus");
          inputRef.current.focus();
        },
      };
    });
    // 这里绑定内部的ref，而不是父组件传过来的
    // 为了只暴漏部分操作权限给父组件
    return <input type="text" ref={inputRef} />;
  });

const App = memo(() => {
  const titleRef = useRef();
  const inputRef = useRef();

  function handleDOM() {
    // 如果只希望父组件获取input焦点，不想它有其他操作
    // 保留某个权限，其他操作不允许在父组件完成
    inputRef.current.focus();
  }

  return (
    <div>
      <h2 ref={titleRef}>哈哈哈</h2>
      {/* ref传递给子组件 */}
      <HelloWorld ref={inputRef} />
      <button onClick={handleDOM}>DOMC操作</button>
    </div>
  );
});

export default App;
