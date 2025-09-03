import React, { PureComponent, createRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
/*
SwitchTransition
■ SwitchTransition 可以完成两个组件之间切换的炫酷动画:
口 比如我们有一个按钮需要在 on 和 of 之间切换，我们希望看到 on 先从左侧退出，off 再从右侧进入:
口 这个动画在 vue 中被称之为 vue transition modes;
口 react-transition-group 中使用 SwitchTransition 来实现该动画

*/
export class App extends PureComponent {
  constructor() {
    super();
    this.state = { isLogin: true };
    this.buttonRef = createRef(); // 创建一个ref，用于获取按钮元素
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        {/* 来回切换用SwitchTransition */}
        {/* mode="out-in",控制动画模式，先离开，再进入 */}
        <SwitchTransition mode="out-in">
          {/* SwitchTransition是包裹CSSTransition，具体的动画还是在CSSTransition中定义 */}
          {/* 这时不用in,用key属性,给他不同的key值，不然不会动画 */}
          <CSSTransition
            key={isLogin ? "exit" : "login"}
            classNames="login"
            timeout={1000}
            nodeRef={this.buttonRef}
          >
            <button
              ref={this.buttonRef}
              onClick={(e) => this.setState({ isLogin: !isLogin })}
            >
              {isLogin ? "退出" : "登录"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}

export default App;
