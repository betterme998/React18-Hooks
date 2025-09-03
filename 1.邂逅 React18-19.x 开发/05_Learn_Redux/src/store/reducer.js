// 放初始化数据，和reducer函数的
// 导入常量文件
const { ADD_NUMBER, CHANGE_NAME } = require("./constant");

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
  //reducer函数可能会越写越复杂，所以我们抽取出来，创建reducer.js文件
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.name };
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.num };
    default:
      return state;
  }

  console.log("reducer:", state, action);

  return state;
}

module.exports = reducer;
