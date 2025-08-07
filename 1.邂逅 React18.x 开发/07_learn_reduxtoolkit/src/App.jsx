import React, { PureComponent } from "react";
// 想使用store数据
import { connect } from "react-redux"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./style.css";

export class App extends PureComponent {

  render() {
  const { counter }  = this.props

    return (
      <div>
        <h2>App: Counter: {counter}</h2>
        <div className="pages">
          <Home />
          <Profile />
        </div>
      </div>
    );
  }
}

// connect方法返回一个高阶组件
// connect方法接收两个参数，第一个参数是mapStateToProps函数，第二个参数是mapDispatchToProps函数
// 注意：connect方法的第一个参数是mapStateToProps函数，用于将redux store中的state映射到组件的props中
// 就是这个组件需要哪些数据，就通过这个参数来告诉connect方法

const mapStateToProps = (state) => ({
  counter: state.counter.counter
})

export default connect(mapStateToProps)(App);
