// 这样写非常繁琐
//1.npm install @reduxjs/toolkit react-redux 下载两个工具包
import React, { memo } from "react";
// 2.引入connect函数，用于连接Redux和React组件
import { connect } from "react-redux";
import { addNumberAction, subNumberAction } from "./store/modules/counter";

const App = memo((props) => {
  const { count, addNumber, subNumber } = props;

  function addNumberHandle(num, isAdd = true) {
    const fn = isAdd ? addNumber : subNumber;
    fn(num);
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

const mapStateToProps = (state) => ({
  count: state.counter.count,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num));
  },
  subNumber(num) {
    dispatch(subNumberAction(num));
  },
});

// 会以props的形式传递给App组件
export default connect(mapStateToProps, mapDispatchToProps)(App);
