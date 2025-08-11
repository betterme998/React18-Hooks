// 中间件：store每次dispatch前打印日志，执行玩后打印日志
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

export default log;
