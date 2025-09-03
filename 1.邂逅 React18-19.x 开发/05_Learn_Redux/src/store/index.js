const { createStore } = require("redux"); //node环境

// 导入reducer函数：纯函数
const reducer = require("./reducer.js");

// 创建的store
// createStore函数接收一个reducer函数作为参数
const store = createStore(reducer);

module.exports = store;
