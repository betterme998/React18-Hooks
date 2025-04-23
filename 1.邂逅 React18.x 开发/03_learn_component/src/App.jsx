import React from "react";

// 1.类组件
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: "App Component",
    };
  }
  render() {
    const { message } = this.state;
    // render返回值
    // 1.react元素:通过jsx编写的代码就会被编译成React.createElement,，所以返回的就是一个React元素
    return <h2>{message}</h2>;
  }
}

export default App;
