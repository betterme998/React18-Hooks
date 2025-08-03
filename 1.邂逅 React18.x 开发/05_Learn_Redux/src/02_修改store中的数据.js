const store = require("./store");

console.log(store.getState()); // { name: 'why', counter: 100 }

// 修改store中的数据：必须派发action
const nameAction = { type: "change_name", name: "kobe" };
store.dispatch(nameAction);

console.log(store.getState()); // { name: 'kobe', counter: 100 }

// 修改counter
const counterAction = { type: "add_number", num: 10 };
store.dispatch(counterAction);
console.log(store.getState()); // { name: 'kobe', counter: 110 }
