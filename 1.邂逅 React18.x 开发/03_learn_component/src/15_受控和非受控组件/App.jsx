import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isAgree: false,
      // 初始值
    };
  }
  handleSubmitClick(e) {
    // 1.阻止默认的行为。表单按钮点击会默认刷新页面
    e.preventDefault();
    // 2.获取到所有的表单数据，对数据进行组件
    console.log(
      "表单数据:",
      this.state.username,
      this.state.password,
      this.state.isAgree
    );

    // 3.以网络请求的方式，将数据传递给服务器(ajax/fetch/axios...)
  }

  handleInputChange(e) {
    const keyName = e.target.name; // 获取input的name属性
    this.setState({
      [keyName]: e.target.value, // 使用计算属性名来动态设置state的属性
    });
  }
  handleAgreeChange(e) {
    this.setState({
      isAgree: e.target.checked,
    });
  }
  render() {
    const { username, password, isAgree } = this.state;
    return (
      <div>
        {/* 监听表单点击  submit */}
        <form onSubmit={(e) => this.handleSubmitClick(e)}>
          <div>
            <label htmlFor="username">
              用户:
              {/* 受控组件，需要绑定监听事件，通过事件修改value值 */}
              <input
                id="username"
                value={username}
                type="text"
                name="username"
                onChange={(e) => this.handleInputChange(e)}
              />
            </label>
            <label htmlFor="password">
              密码:
              {/* 受控组件，需要绑定监听事件，通过事件修改value值 */}
              <input
                id="password"
                value={password}
                type="password"
                name="password"
                onChange={(e) => this.handleInputChange(e)}
              />
            </label>
          </div>

          {/* 2.checkbox */}
          <label htmlFor="agree">
            <input
              id="agree"
              type="checkbox"
              checked={isAgree}
              name="isAgree"
              onChange={(e) => this.handleAgreeChange(e)}
            />
            同意协议
          </label>
          <div>
            <button type="submit">提交</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
