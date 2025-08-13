import React, { PureComponent } from "react";
import { Link, Outlet } from "react-router";

// 增强类组件使用函数式组件hooks功能
import { withRouter } from "../hoc";
/*
在类组件中使用 hooks 解决办法：高阶组件增强
*/
export class Home extends PureComponent {
  navigateTo(path) {
    // 通过高阶函数增强传过来的router
    const { navigate } = this.props.router;
    // 类组件使用hooks
    navigate(path);
  }
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div className="home-nav">
          <Link to="/home/recommend">推荐</Link>
          <Link to="/home/ranking">排行榜</Link>
          <button
            onClick={(e) => {
              this.navigateTo("/home/songmenu");
            }}
          >
            歌单
          </button>
        </div>

        {/* 占位的组件 */}
        <Outlet />
      </div>
    );
  }
}

export default withRouter(Home);
