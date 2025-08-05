// applyMiddleware:应用中间件
import { createStore, applyMiddleware } from "redux";
// 3.导入reducer函数
import reducer from "./reducer";

// 4.增强store,导入中间件
import { thunk } from "redux-thunk";

// 1.创建store,
// 2.需要传入一个reducer函数->创建reducer.js文件

// 正常情况下store.dispatch(对象)，派发的是对象
// 如果派发的是一个函数store.dispatch(function)，那么就需要用到中间件,对创建的store进行增强
// 中间件：对store进行增强，对dispatch进行改造，让其支持函数派发
// npm install redux-thunk

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
