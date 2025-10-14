// ■useCallback实际的目的是为了进行性能的优化。
// 如何进行性能的优化呢?
// 口 useCallback会返回一个函数的 memoized(记忆的)值;
// 口 在依赖不变的情况下，多次定义的时候，返回的值是相同的，
import React, { memo, useState, useCallback, useRef } from "react";

const HYIncrement = memo(function (props) {
  const { increment } = props;

  console.log("HYIncrement渲染了");

  return (
    <div>
      <button onClick={increment}>increment +1</button>
    </div>
  );
});

const App = memo(() => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("hello world");
  console.log("App");

  // 每次组件渲染都会重新创建函数
  // 思考一下：多次渲染导致函数重复创建，之前的函数会被销毁吗？
  // 会被销毁，因为函数没有引用指向它
  // 虽然会被销毁，但是每次都得重新创建

  // 这里传递的函数依旧会被重新创建，只是传递给了useCallback
  // const increment = useCallback(
  //   // 点击时因为count变化，导致increment重新创建，从而导致HYIncrement更新
  //   // 那这样也会导致更新这和普通函数一样有什么意义呢？
  //   function () {
  //     setCount(count + 1);
  //   },
  //   // 优化：能不能即便count变化，increment函数也不会重新创建？
  //   [count]
  // );

  // 进一步优化：进一步的优化:当count发生改变时，也使用同一个函数
  // 做法一：将count依赖移除掉，缺点：闭包陷阱
  // 做法二：useRef,在组件多次渲染时，返回的是同一个值
  const countRef = useRef();
  countRef.current = count;
  const increment = useCallback(function () {
    setCount(countRef.current + 1);
    // setCount((prevCount) => prevCount + 1);
  }, []);

  //普通函数
  // const increment = () => {
  //   // 每次点击HYIncrement组件都会重新渲染，因为每次渲染increment会重新创建，increment又传给了HYIncrement导致的重新渲染，
  //   setCount(count + 1);
  // };

  // useCallback接收两个参数，第一个是回调函数，第二个是依赖数组
  // 闭包陷阱：当第二个参数为空数组时，不管怎么设置展示数据，页面都不会更新
  // 因为useCallback第一次返回的函数，所获取的参数是不变的，后续的渲染依旧用的是第一次返回的函数以及参数
  // 只有设置了依赖数组，才会重新创建函数，并传递新的参数

  return (
    <div>
      <h2>计数：{count}</h2>
      <button onClick={increment}>+1</button>
      {/* 传入函数 */}
      <HYIncrement increment={increment} />

      <h2>message: {message}</h2>
      {/* increment是普通函数时，点击修改message，也会导致HYIncrement重新渲染 */}
      {/* 因为message变化，导致App组件重新渲染，increment函数被重新定义，从而影响HYIncrement组件重新渲染 */}

      {/* 当increment是useCallback返回的函数时，因为依赖值是count，所以修改message,不会导致increment函数被重新定义，所以HYIncrement组件不会重新渲染 */}
      {/* useCallback进行性能的优化，如果HYIncrement是很大的页面，那么优化就很关键 */}
      <button onClick={(e) => setMessage("你好啊")}>修改message</button>
    </div>
  );
});

// 案例闭包
function foo(name) {
  function bar() {
    console.log(name);
  }
  return bar;
}
const bar1 = foo("why");
bar1(); //why

const bar2 = foo("kobe");
bar2(); //kobe

// 这个时候调用bar1，会发现依旧是why
bar1(); //why

export default App;

// 总结：useCallback性能优化的点：（子组件受父组件传递的普通函数，在父组件任何数据改变时，普通函数重新生成导致子组件重新渲染）
// （因为useCallback只有在依赖值改变时才会重新生成函数，和获取新的参数，其他值怎么变都不会影响useCallback返回的函数）
// 1.当需要将一个函数传递给子组件时，最好使用useCallback进行优化，将优化之后的函数，传递给子组件
