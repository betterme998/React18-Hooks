import React, { PureComponent } from "react";
/*
■ 在 React 中，HTML 表单的处理方式和普通的 DOM 元素不太一样:表单元素通常会保存在一些内部的 state

■ 在 HTML 中，表单元素(如<input>、<textarea>和<select>)之类的表单元素通常自己维护 state，并根据用户输入进行更新。
■ 而在 React 中，可变状态(mutable state)通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新
口 我们将两者结合起来，使 React 的 state 成为“唯一数据源”
口 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作,
ロ 被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”
*/
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
      fruit: ["orange"],
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
        .map((item) => item.value),
      this.state.fruit
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
  // checkbox 多选
  handleHobbisChange(e, index) {
    const hobbis = [...this.state.hobbis]; // 创建一个新的数组
    const isChecked = e.target.checked; // 获取checkbox的id值
    hobbis[index].isChecked = isChecked; // 修改数组中对应项的值

    this.setState({
      hobbis: hobbis,
    });
  }

  // select元素 多选
  handleFruitChange(e) {
    // e.target.selectedOptions是可迭代器，可以将其转换为数组
    // e.target.selectedOptions获取选中的option元素

    // const options = Array.from(e.target.selectedOptions); // 转换为数组
    // const values = options.map((option) => option.value); // 获取选中项的值
    const values = Array.from(e.target.selectedOptions, (item) => item.value);

    console.log(values);

    this.setState({
      fruit: values,
    });

    // 额外补充： Array.from(传入可迭代对象) 可以将可迭代对象转换为数组
    // Array.from(arguments); //arguments 参数 是类数组对象

    //Array.from()可传人第二个参数，mapping函数，可以对转换后的数组进行二次处理
    // const values = Array.from(e.target.selectedOptions, item => item.value)
  }
  render() {
    const { username, password, isAgree, hobbis, fruit } = this.state;
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

          {/* 4.select元素 ,当设置了多选时*/}
          <select
            value={fruit}
            onChange={(e) => this.handleFruitChange(e)}
            multiple
          >
            <option value="apple">苹果</option>
            <option value="banana">香蕉</option>
            <option value="orange">橘子</option>
          </select>

          <div>
            <button type="submit">提交</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
