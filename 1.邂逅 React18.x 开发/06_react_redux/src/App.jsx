/*
redux 和 react 结合使用
1.安装redux： npm install redux 
2.创建store文件夹 -> 创建index.js -> 创建store并传入reducer函数
3.因为要reducer函数，所以创建reducer.js文件
4.在App组件中使用store,对store进行订阅，获取state的值
5.修改store的数据，-> 在store文件夹中创建actionCreators.js文件
6.action中的字符串凑成常量到一个文件中统一管理
7.使用store时，很多页面都需要订阅store的变化，出现大量重复代码：使用高阶组件拦截，社区已经提供了connect高阶组件
8.下载高阶组件库：npm install react-redux。整个库目的是为了让react和redux结合使用
9.在App组件中使用Provider包裹，传入store
10.在组件中使用connect高阶组件，传入mapStateToProps和mapDispatchToProps
11.通过props接收store中的数据和dispatch方法
12.下载axios，请求网络请求，并保存到store中
13.将网络请求的代码写在redux中
14.使用redux-thunk中间件，处理异步请求
15.我们在store中放了很多数据，修改的人太多，不方便管理。重构store.,不同数据放在不同的reducer中
16.创建多个reducer文件，分别管理不同的数据
17.使用combineReducers函数，将多个reducer合并成一个reducer
18.在store的index.js中引入combineReducers函数，将多个reducer合并成一个reducer
19.combineReducers函数原理
*/
import React, { PureComponent } from "react";
import Home from "./pages/home";
import Profile from "./pages/profile";
import About from "./pages/about";
import Category from "./pages/category";

import "./style.css";
import store from "./store";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      // 订阅store，只有数据变化时才会更新state的值，
      // 第一次state的值要用下面方法取
      counter: store.getState().counter.counter,
    };
  }
  componentDidMount() {
    // 订阅store的变化
    store.subscribe(() => {
      const state = store.getState().counter.counter;
      this.setState({ counter: state.counter });
    });
  }
  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>App Counter: {counter}</h2>

        <div className="pages">
          <Home />
          <Profile />
          <About />
          <Category />
        </div>
      </div>
    );
  }
}

export default App;
