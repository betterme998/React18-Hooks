import React, { PureComponent } from "react";

// 类组件可以保存自己的状态
class HelloWord extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: "hello world",
    };
  }

  changeText() {
    this.setState({
      message: "你好啊",
    });
  }

  render() {
    const { message } = this.state;
    // 函数式组件存在的最大问题
    // 1.修改message之后，组件不知道要重新渲染
    // 2.就算组件重新渲染，函数重新执行，message值依旧被赋值为hello world
    // 3.不能编写生命周期回调

    return (
      <div>
        <h2>内容：{message}</h2>
        <button onClick={(e) => this.changeText()}>修改文本</button>
      </div>
    );
  }
}

function HelloWord2(props) {
  let message = "hello world2";
  return (
    <div>
      <h2>内容2: {message}</h2>
      <button>修改文本</button>
    </div>
  );
}

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWord />
        <hr />
        <HelloWord2 />
      </div>
    );
  }
}

export default App;
