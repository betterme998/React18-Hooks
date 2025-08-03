const store = require("./store");

// 导入动态生成的action
const { changeNameAction, addNumberAction } = require("./store/actionCreators");

// 订阅store中的数据变化
// 取消订阅store中的数据变化,z返回值是一个函数，调用这个函数可以取消订阅store中的数据变化
const unsubscribe = store.subscribe(() => {
  console.log("store中的数据被修改了", store.getState());
});

// actionCreators:帮助我们创建action
// 注意：动态生成的action，如果写在这个文件当中，其他文件就用不了，要么再创建，所以我们将它们放在一个单独的文件中
// 在store文件夹下创建actionCreators.js文件，在里面定义动态生成的action

// const changeNameAction = (name) => {
//   return {
//     type: "change_name",
//     name,
//   };
// };

// 修改store中的数据：必须派发action
store.dispatch(changeNameAction("kobe"));
store.dispatch(changeNameAction("lilei"));

// const addNumberAction = (num) => {
//   // 定义一个对象，用于表示添加数字的操作
//   return {
//     type: "add_number",
//     num,
//     // 对象的键和值
//   };
// };

// 修改counter
store.dispatch(addNumberAction(10));
store.dispatch(addNumberAction(20));

// 取消订阅
unsubscribe();
store.dispatch(addNumberAction(30));
