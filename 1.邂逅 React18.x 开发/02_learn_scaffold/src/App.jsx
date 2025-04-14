// 编写一个组件
import React from "react";
import HelloWorld from "./Components/HellWorld";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Hello React Scaffold",
    };
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h2>{message}</h2>
        <HelloWorld />
      </div>
    );
  }
}
export default App;
