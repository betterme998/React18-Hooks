import React, { PureComponent } from "react";
import { withRouter } from "../hoc";
/*
使用高阶组件，在类组件中使用hook函数
// 点击歌单跳转详情页，并传递参数id

*/
export class HomeSongMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      songMenus: [
        { id: 111, name: "华语流行" },
        { id: 112, name: "古典音乐" },
        { id: 113, name: "民谣歌曲" },
      ],
    };
  }
  NavigateToDetail(id) {
    // 在类组件中使用hooks函数
    const { navigate } = this.props.router;
    // 路由跳转传递参数id到详情页
    navigate("/detail/" + id);
  }
  render() {
    const { songMenus } = this.state;
    return (
      <div>
        <h2>Home Song Menu</h2>
        <ul>
          {songMenus.map((item) => {
            return (
              <li onClick={(e) => this.NavigateToDetail(item.id)} key={item.id}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(HomeSongMenu);
