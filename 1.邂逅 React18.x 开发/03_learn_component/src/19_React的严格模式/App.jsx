import React, { PureComponent, StrictMode } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
/*
严格模式StrictMode
创建两个页面，一个开启严格模式，一个不开启严格模式.观察他们的区别
*/
export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("App组件创建了,严格模式执行两次");
  }
  render() {
    return (
      <div>
        {/* 开启严格模式 */}
        <StrictMode>
          <Home />
        </StrictMode>
        <Profile />
      </div>
    );
  }
}

export default App;
