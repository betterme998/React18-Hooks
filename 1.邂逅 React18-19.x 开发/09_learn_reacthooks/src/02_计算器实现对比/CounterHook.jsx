// useState在函数式组件中定义状态,接收一个初始化状态值，返回一个数组，数组中有两个值，第一个值是状态值，第二个值是更新状态值的函数
import { memo, useState } from "react";
// --------------------------
// 普通的函数，里面不能使用hooks
// 自定义的hooks中，可以使用react提供的hooks：必须使用use开头
function useFoo() {
  const [message] = useState("Hello World");
  return message;
}
// 函数式组件实现
function CounterHook(props) {
  // 通常进行解构，方便阅读
  // 在第一次渲染时，才会使用初始化状态值0，后续渲染直接使用最新的状态值
  const [counter, setCounter] = useState(0);
  // useState解析
  // 那么我们来研究一下核心的一段代码代表什么意思:
  // 口 useState来自react，需要从react中导入，它是一个hook;
  //    参数:初始化值，如果不设置为undefined;
  //    返回值:数组，包含两个元素
  //      >元素一:当前状态的值(第一调用为初始化值);
  //      >元素二:设置状态值的函数
  //口 点击button按钮后，会完成两件事情:
  //    调用setCount，设置一个新的值，
  //    组件重新渲染，并且根据新的值返回DOM结构

  // 自定义hooks
  // hooks必须顶层调用
  // 但是使用它们会有两个额外的规则:
  //口 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用.
  //口 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用

  // const message = useFoo();

  return (
    <div>
      <h2>函数式实现：当前计数：{counter}</h2>
      {/* 传入最新的状态值 */}
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
      <button onClick={(e) => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default memo(CounterHook);
