const store = require("./store");

// 使用node运行这个js文件node ./01_使用store中的数据.js，
// 查看store中的数据。{ name: 'why', counter: 100 }
console.log(store.getState()); // 输出初始状态
