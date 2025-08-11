// 中间件，自定义实现redux-thunk中间件，实现异步action
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
export default thunk;
