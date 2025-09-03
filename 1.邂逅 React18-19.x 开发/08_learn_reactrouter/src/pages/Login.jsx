/*
Navigate导航
■ Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中:

■ 我们这里使用这个的一个案例:
口 用户跳转到登录页面，点击登录，登陆成功跳转到首页


口 用户跳转到Profile界面
口 但是在Profile界面有一个isLogin用于记录用户是否登录
√ true:那么显示用户的名称;
√ false:直接重定向到登录界面，
*/ 
import React, { PureComponent } from 'react'
import {Navigate} from "react-router"

export class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }
  login() {
    this.setState({ isLogin: true })
  }
  render() {
      const { isLogin } = this.state

    return (

      <div>
        <h1>Login Page</h1>
        {/* 如果已登录：重定向到首页 */}
        {!isLogin ? <button onClick={e => this.login()}>登录</button> : <Navigate to="/home"/>}
      </div>
    )
  }
}

export default Login