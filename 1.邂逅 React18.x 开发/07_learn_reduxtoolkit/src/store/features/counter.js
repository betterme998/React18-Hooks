/*
重构代码-创建counter的reducer

■ 我们先对counter的reducer进行重构:通过createSlice创建一个slice。
■ createslice主要包含如下几个参数:
■ name:用户标记slice的名词
口 在之后的redux-devtool中会显示对应的名词;

■  initialState:初始化值
口 第一次初始化时的值;

■ reducers:相当于之前的reducer函数
口 对象类型，并且可以添加很多的函数;
口 函数类似于redux原来reducer中的一个case语句;
口 函数的参数:
参数一:state
参数二:调用这个action时，传递的action参数
*/

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888,
  },
  reducers: {
    addNumber: (state, action) => {},
    subNumber: (state, action) => {},
  },
});
export const { addNumber, subNumber } = counterSlice.actions;
export default counterSlice.reducer;
