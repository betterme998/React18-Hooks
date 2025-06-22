import React, { PureComponent } from "react";
import loginAuth from "../hoc/login_auth";
// 对这个购物车页面进行健全，用户登录才能看。通过高阶组件包裹

export class Cart extends PureComponent {
  render() {
    return <div>Cart</div>;
  }
}

export default loginAuth(Cart);
