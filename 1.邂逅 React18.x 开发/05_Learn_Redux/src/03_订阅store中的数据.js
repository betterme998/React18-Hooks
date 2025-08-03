const store = require("./store");

// 订阅store中的数据变化
// 取消订阅store中的数据变化,z返回值是一个函数，调用这个函数可以取消订阅store中的数据变化
const unsubscribe = store.subscribe(() => {
  console.log("store中的数据被修改了", store.getState());
});

// 修改store中的数据：必须派发action
store.dispatch({ type: "change_name", name: "kobe" });
store.dispatch({ type: "change_name", name: "lilei" });

// 取消订阅
unsubscribe();

// 修改counter
store.dispatch({ type: "add_number", num: 10 });
