// useSelector:传入一个回调函数，到时候内部就回执行回调函数，会传过来一个state
// 返回值是一个对象，想拿哪个就拿哪个

// useSelector的作用是将state映射到组件中:
// 口 参数一:"将state映射到需要的数据中;
// 口 参数二:可以进行比较来决定是否组件重新染;(后续讲解)
// useSelector默认会比较我们返回的两个对象是否相等口如何比较呢?const refEquality =(a,b)=>a=== b;
// 口 也就是我们必须返回两个完全相等的对象才可以不引起重新染;
import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNumberAction, subNumberAction } from "./store/modules/counter";

const App = memo((props) => {
  // 1.使用useselector将redux中store的数据映射到组件内
  const { count } = useSelector((state) => ({
    count: state.counter.count,
  }));

  // 2.使用useDispatch直接派发action
  const dispatch = useDispatch();
  function addNumberHandle(num, isAdd = true) {
    isAdd ? dispatch(addNumberAction(num)) : dispatch(subNumberAction(num));
  }

  return (
    <div>
      <h2>当前计数：{count}</h2>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(6)}>+6</button>
      <button onClick={(e) => addNumberHandle(6, false)}>-6</button>
    </div>
  );
});

export default App;
