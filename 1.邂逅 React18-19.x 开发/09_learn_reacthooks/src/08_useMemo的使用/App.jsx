// ■useMemo实际的目的也是为了进行性能的优化。
// ■如何进行性能的优化呢?
// 口useMemo返回的也是一个memoized(记忆的)值;
// 口 在依赖不变的情况下，多次定义的时候，返回的值是相同的;

// 案例:
// 口 案例一:进行大量的计算操作，是否有必须要每次染时都重新计算
// 口 案例二:对子组件传递相同内容的对象时，使用useMemo进行性能的优化

import React, { memo, useMemo, useState } from "react";

const HelloWorld = memo(function (props) {
  console.log("hello world组件渲染了");

  return <h2>hello world</h2>;
});

// 计数数字总和
function calcNumTotal(num) {
  //案例一
  console.log("calcNumTotal的计算过程被调用");

  let total = 0;
  for (let i = 1; i <= num; i++) {
    total += i;
  }
  return total;
}

const App = memo(() => {
  const [count, setCount] = useState(0);

  // 方式一：直接调用函数，不优化
  // const result = calcNumTotal(50);//任何useState的更新，都会导致calcNumTotal(50)重新执行，因为值不变，所以子组件不会重新渲染

  // 方式二：useMemo优化，但不依赖任何的值，进行计算
  // calcNumTotal(50)函数只执行一次，因为依赖项为空数组，子组件不会重新渲染
  let result = useMemo(() => {
    return calcNumTotal(50);
  }, []);

  // 1.的解决办法：使用useMemo:对返回结果进行优化,只有依赖项变化时，才重新计算
  // 参数：函数，依赖项

  // let result = useMemo(() => {
  //   return calcNumTotal(count);
  // }, [count]); //谁都不依赖传入空数组[]

  // 方式三：使用useMemo对子组件渲染进行优化 案例二
  // const info = { name: "why", age: 18 }; //点击按钮，组件重新渲染->导致子组件重新渲染
  const info = useMemo(() => ({ name: "why", age: 18 }), []);

  // useCallback(fn, []) 相当于useMemo(() => fn, [])
  // useCallback返回的是函数，useMemo返回的是结果，受依赖项影响

  return (
    <div>
      <h2>计算结果：{result}</h2>
      <h2>计数器：{count}</h2>

      {/* 1.点击按钮，count变化，组件重新渲染-->导致calcNumTotal(50)重新执行 */}
      <button onClick={(e) => setCount(count + 1)}>+1</button>

      <HelloWorld result={result} info={info} />
    </div>
  );
});

export default App;
