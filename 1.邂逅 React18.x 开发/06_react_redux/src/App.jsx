/*
redux 和 react 结合使用
1.安装redux： npm install redux 
2.创建store文件夹 -> 创建index.js -> 创建store并传入reducer函数
3.因为要reducer函数，所以创建reducer.js文件
4.在App组件中使用store,对store进行订阅，获取state的值
*/
import React, { PureComponent } from "react";
import Home from "./pages/home";
import Profile from "./pages/profile";
import "./style.css";
import store from "./store";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      // 订阅store，只有数据变化时才会更新state的值，
      // 第一次state的值要用下面方法取
      counter: store.getState().counter,
    };
  }
  componentDidMount() {
    // 订阅store的变化
    store.subscribe(() => {
      const state = store.getState();
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
        </div>
      </div>
    );
  }
}

export default App;
