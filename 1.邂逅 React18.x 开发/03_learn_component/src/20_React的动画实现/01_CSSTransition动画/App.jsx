import React, { PureComponent, createRef } from "react";
// 引入css，才会生效
import "./style.css";
import { CSSTransition } from "react-transition-group";
/*
给h2标签添加动画
1.React 的过渡动画

react-transition-group 介绍

动画库是针对：添加类名。具体动画是我们自己写在css中。由动画库来控制类名的添加和删除。

■ 在开发中，我们想要给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户体验。
■ 当然，我们可以通过原生的 CSS 来实现这些过渡动画，但是 React 社区为我们提供了 react-transition-group 用来完成过渡动画。
■ React 曾为开发者提供过动画插件 react-addons-css-transition-group，后由社区维护，形成了现在的 ■ react-transition-group.
口 这个库可以帮助我们方便的实现组件的 入场 和 离场 动画，使用时需要进行额外的安装
# npm

npm install react-transition-group --save

# yarn

yarn add react-transition-group
*/

/*
react-transition-group主要组件

■ react-transition-group主要包含四个组件:
■ Transition
口 该组件是一个和平台无关的组件(不一定要结合CSS):
口 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition;

■ CSSTransition
口 在前端开发中，通常使用 CSSTransition 来完成过渡动画效果

■ SwitchTransition
口 两个组件显示和隐藏切换时，使用该组件

■ TransitionGroup
口 将多个动画组件包裹在其中，一般用于列表中元素的动画

*/

/*
■ CSSTransition是基于Transition组件构建的:
口 CSSTransition执行过程中，有三个状态:appear、enter、exit; (出现，进入，离开)

■ 它们有三种状态，需要定义对应的CSS样式:
口 第一类:开始状态:对应的类是-appear、-enter、exit;
口 第二类:执行动画:对应的类是-appear-active、-enter-active、-exit-active;
口 第三类:执行结束:对应的类是-appear-done、-enter-done、-exit-done;
*/

/*
■ CSSTransition常见对应的属性:
■ 1.in:触发进入或者退出状态
口 如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉;
口 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class并且添加-enter-done的class
口 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class;

■ 2.classNames:动画 class 的名称
口 决定了在编写 css 时，对应的 class 名称:比如 card-enter、card-enter-active、card-enter-done;

■ 3.timeout:
口 过渡动画的时间

■ 4.appear:
口 是否在初次进入添加动画(需要和in同时为true)

■ 5.unmountOnExit:退出后卸载组件

■ 6.CSSTransition对应的钩子函数:主要为了检测动画的执行过程，来完成一些JavaScript的操作
口 onEnter:在进入动画之前被触发;
口 onEntering:在应用进入动画时被触发,
口 onEntered:在应用进入动画结束后被触发;
口 onExit:在退出动画之前被触发;
口 onExiting:在应用退出动画时被触发;
口 onExited:在应用退出动画结束后被触发;
*/
export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
    this.h2Ref = createRef(); // 创建一个ref对象，用于获取h2元素
  }
  render() {
    const { isShow } = this.state;
    return (
      <div>
        <button
          onClick={(e) => {
            this.setState({ isShow: !isShow });
            console.log(this.state.isShow); // 打印当前状态
          }}
        >
          切换
        </button>
        {/* {isShow && <h2>哈哈哈</h2>} */}

        {/* 创建style.css文件，定义类的动画 */}
        {/* timeout必填,unmountOnExit退出时卸载元素必填 */}
        {/* 注意：react18以上版本需要给动画元素添加ref，并且在动画库中使用nodeRef属性 */}
        {/* 因为react有很多一起的api已经被删除了 */}
        <CSSTransition
          in={isShow}
          nodeRef={this.h2Ref} // 需要传入ref对象
          unmountOnExit={true}
          classNames="why"
          timeout={2000}
          appear
          onEnter={(e) => console.log("在进入动画之前被触发")}
          onEntering={(e) => console.log("在应用进入动画时被触发")}
          onEntered={(e) => console.log("在应用进入动画结束后被触发")}
          onExit={(e) => console.log("在退出动画之前被触发")}
          onExiting={(e) => console.log("在应用退出动画时被触发")}
          onExited={(e) => console.log("在应用退出动画结束后被触发")}
        >
          <div ref={this.h2Ref} className="section">
            <h2>哈哈哈</h2>
            <p>我是内容，哈哈哈</p>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
