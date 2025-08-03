// 用于动态生成action
const changeNameAction = (name) => {
  return {
    type: "change_name",
    name,
  };
};

const addNumberAction = (num) => {
  // 定义一个对象，用于表示添加数字的操作
  return {
    type: "add_number",
    num,
    // 对象的键和值
  };
};

// node导出
module.exports = {
  changeNameAction,
  addNumberAction,
};
