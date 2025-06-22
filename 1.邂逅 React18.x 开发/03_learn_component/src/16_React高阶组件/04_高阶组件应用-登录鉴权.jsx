import React, { PureComponent } from "react";
import Cart from "./pages/Cart";
/*
用户登录后才能看见cart购物车页面
如果每个地方都需要判断用户是否登录，代码会变得很冗余
通过高阶组件封装一个hoc，login_auth.js，在里面判断用户是否登录

*/
export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  loginClick() {
    localStorage.setItem("token", "123456");
    // 如果没有isLogin，则强制更新组件
    // this.forceUpdate(); // 强制更新组件，不推荐使用,过时

    this.setState({
      isLogin: true,
    });
  }
  render() {
    return (
      <div>
        App
        <button onClick={(e) => this.loginClick()}>登录</button>
        <Cart />
      </div>
    );
  }
}

export default App;
