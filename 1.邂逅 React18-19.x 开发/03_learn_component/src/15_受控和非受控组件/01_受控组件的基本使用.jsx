import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      username: "coderwhy",
    };
  }

  inputChange(e) {
    console.log("input change:", e);
    // 受控组件，通过onChange事件修改state的值来更新input的value值
    this.setState({ username: e.target.value }, () => {
      console.log(this.state.username);
    });
  }
  render() {
    const { username } = this.state;
    return (
      <div>
        {/* 当表单组件绑定state值后就变成受控组件，值必须用过onChange修改state的值才能修改 */}
        <input
          type="text"
          value={username}
          onChange={(e) => this.inputChange(e)}
        />
        {/* 非受控组件，input的value值不受state控制 */}
        <input type="text" />
        <h2>username:{username}</h2>
      </div>
    );
  }
}

export default App;
