const { createStore } = require("redux"); //node环境

// 初始化的数据
const initialState = {
  name: "why",
  counter: 100,
};

// 定义reducer函数：纯函数
// 两个参数
//参数一：store中目前保存的state
// 参数二：本次需要更新的action（dispatch传入的参数)）
// 返回值：它的返回值会作为store之后存储的state
// state = initialState，初始化state是否为undefined，是的话给她一个初始值initialState
function reducer(state = initialState, action) {
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.name };
    case "add_number":
      return { ...state, counter: state.counter + action.num };
    default:
      return state;
  }

  console.log("reducer:", state, action);

  return state;
}

// 创建的store
// createStore函数接收一个reducer函数作为参数
const store = createStore(reducer);

module.exports = store;
