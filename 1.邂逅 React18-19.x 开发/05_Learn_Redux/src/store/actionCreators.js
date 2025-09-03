// 用于动态生成action
// 如果action的type是直接写出来的，那其他地方使用就很容易出现写错的问题。
// 所以我们在建立一个常量文件constants.js文件，在里面定义常量
const { ADD_NUMBER, CHANGE_NAME } = require("./constant");

const changeNameAction = (name) => {
  return {
    type: CHANGE_NAME,
    name,
  };
};

const addNumberAction = (num) => {
  // 定义一个对象，用于表示添加数字的操作
  return {
    type: ADD_NUMBER,
    num,
    // 对象的键和值
  };
};

// node导出
module.exports = {
  changeNameAction,
  addNumberAction,
};
