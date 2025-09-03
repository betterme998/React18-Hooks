// applyMiddleware:应用中间件
import { createStore, applyMiddleware, compose } from "redux";
// 3.导入reducer函数
import reducer from "./reducer";

// 4.增强store,导入中间件
import { thunk } from "redux-thunk";

// 开发环境下，可以使用redux-devtools-extension扩展工具,
// 兼容写法：如果浏览器支持redux-devtools扩展工具，那么就使用它，否则就用默认的compose函数
// zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 1.创建store,

// createStore有两个参数，一个是reducer函数，另一个是增强器enhancer
// reducer函数：纯函数，接收state和action，返回新的state
// enhancer:增强器，对store进行增强，对dispatch进行改造，让其支持函数派发

// 2.需要传入一个reducer函数->创建reducer.js文件

// 正常情况下store.dispatch(对象)，派发的是对象
// 如果派发的是一个函数store.dispatch(function)，那么就需要用到中间件,对创建的store进行增强
// 中间件：对store进行增强，对dispatch进行改造，让其支持函数派发
// npm install redux-thunk

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
