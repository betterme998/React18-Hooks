import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isAgree: false,
      hobbis: [
        { value: "sing", text: "唱", isChecked: false },
        { value: "dance", text: "跳", isChecked: false },
        { value: "rap", text: "rap", isChecked: false },
      ],
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
      this.state.isAgree,
      this.state.hobbis
        .filter((item) => item.isChecked)
        .map((item) => item.value)
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
  // 多选
  handleHobbisChange(e, index) {
    const hobbis = [...this.state.hobbis]; // 创建一个新的数组
    const isChecked = e.target.checked; // 获取checkbox的id值
    hobbis[index].isChecked = isChecked; // 修改数组中对应项的值

    this.setState({
      hobbis: hobbis,
    });
  }
  render() {
    const { username, password, isAgree, hobbis } = this.state;
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

          {/* 3.checkbox 多选*/}
          <div>
            您的爱好:
            {hobbis.map((item, index) => {
              return (
                <label htmlFor={item.value} key={item.value}>
                  <input
                    type="checkbox"
                    id={item.value}
                    checked={item.isChecked}
                    onChange={(e) => this.handleHobbisChange(e, index)}
                  />
                  {item.text}
                </label>
              );
            })}
          </div>
          <div>
            <button type="submit">提交</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
