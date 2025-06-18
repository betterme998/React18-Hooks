/*
高阶函数的维基百科定义:至少满足以下条件之一:
口 接受一个或多个函数作为输入;
口 输出一个函数;
*/
// 回顾函数
function foo() {
  console.log("foo function called");
}

// 高阶函数
function foo2(fn) {
  console.log("foo2 function called");
  setTimeout(() => {
    fn();
  }, 1000);
}

foo2(foo);

// [].map().filter().reduce().forEach().map()

// 高阶函数
function foo3() {
  function bar() {}

  return bar;
}
const fn = foo3();
