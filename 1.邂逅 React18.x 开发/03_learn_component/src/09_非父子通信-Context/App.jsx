import React, { Component } from "react";
import Home from "./Home";
// 1.引入上下文
import ThemeContext from "./context/theme-context";
// 实现在App组件中，将info对象直接传递给HomeInfo组件
// 不经过home组件，直接传递给HomeInfo组件

export class App extends Component {
  constructor() {
    super();
    this.state = {
      info: { name: "kobe", age: 18 },
    };
  }
  render() {
    const { info } = this.state;
    return (
      <div>
        <h2>App</h2>
        {/* 1.给Home组件传递info对象 */}
        {/* <Home name="App" age="18"></Home> */}
        {/* <Home name={info.name} age={info.age}></Home> */}
        {/* jsx会将info对象中的属性全部传递给Home组件 */}
        <Home {...info}></Home>

        {/* 2.将info对象传递给HomeInfo组件ThemeContext中Provider中value属性为后代提供数据 */}
        {/* 第二步操作：通过 */}
        <ThemeContext.Provider value={{ color: "red" }}>
          <Home {...info} />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
