// applyMiddleware:应用中间件
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// 3.导入reducer函数
import counterReducer from "./counter";
import homeReducer from "./home";
import userReducer from "./user";
// 4.增强store,导入中间件
// import { thunk } from "redux-thunk";

// 3.2:合并多个reducer函数
const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer,
  user: userReducer,
});

// combineReducers实现原理
// function reducer2(state = {}, action) {
//   // 返回一个对象,store的state就是这个对象
//   return {
//     // 这里执行每个reducer函数，因为state={}，所以这里的state.counter,state.home,state.user都是undefined
//     // 但是每个reducer函数都有默认值，所以不会报错，所以这里的state.counter,state.home,state.user都是初始值

//     counter: counterReducer(state.counter, action),
//     home: homeReducer(state.home, action),
//     user: userReducer(state.user, action),
//   };
// }

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

const store = createStore(reducer);

// 中间件
// 对每次派发的action进行拦截,进行日志打印
function log(store) {
  // 这就是中间件，在派发之前做一层拦截

  // 记录派发之前的dispatch方法
  const next = store.dispatch;
  function logAndDispatch(action) {
    console.log("当前派发的action：", action);

    // 真正派发的代码：使用之前的dispath进行派发
    next(action);

    console.log("派发之后的结果：", store.getState());
  }

  // monkey patch:猴补丁 => 篡改现有的代码，对整体的执行逻辑进行修改
  store.dispatch = logAndDispatch;
}
log(store);

// 自己编写中间件
function thunk(store) {
  // 1.记录原始的dispatch方法
  const next = store.dispatch;
  function dispatchThunk(action) {
    // 派发过来的可能是一个对象，也可能是一个函数，是函数就执行
    if (typeof action === "function") {
      // 执行函数，并且将dispatch,getState传入函数中
      action(store.dispatch, store.getState);
    } else {
      next(action);
    }
  }
  store.dispatch = dispatchThunk;
}
thunk(store);

export default store;
