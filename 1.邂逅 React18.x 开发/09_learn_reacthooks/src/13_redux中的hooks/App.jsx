// useSelector的浅比较性能优化
import React, { memo } from "react";
// shallowEqual是浅比较，如果两个对象相同，则返回true
// useSelector，useDispatch用于在组件中获职store中的数据开派发action
// useSelector接收两个参数，第一个是回调函数，第二个是浅比较函数
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addNumberAction,
  changeMessageAction,
  subNumberAction,
} from "./store/modules/counter";

// memo高阶组件包裹起来的组件有对应的特点：只有props发生改变时，才会重新渲染
// 但是home组件并没有传入props，但是点击按钮，home组件也会重新渲染
// 原因：useSelector其实是对整个state进行监听，只要store中数据发生变化，组件就会重新渲染

// 解决：useSelector第二个参数传入shallowEqual，进行浅比较
// 只有当前一个state和下一个state相同，组件就不会重新渲染
const Home = memo((props) => {
  const { message } = useSelector(
    (state) => ({
      message: state.counter.message,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  function changeMessageHandle() {
    dispatch(changeMessageAction("hahahha"));
  }

  console.log("Hoome");

  return (
    <div>
      <h2>Home: {message}</h2>
      <button onClick={(e) => changeMessageHandle()}>修改message</button>
    </div>
  );
});

const App = memo((props) => {
  // 1.使用useselector将redux中store的数据映射到组件内
  const { count } = useSelector(
    (state) => ({
      count: state.counter.count,
    }),
    shallowEqual
  );
  console.log("app");

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
      <Home />
    </div>
  );
});

export default App;
