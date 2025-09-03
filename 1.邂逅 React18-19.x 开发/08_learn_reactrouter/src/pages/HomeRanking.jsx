import React, { PureComponent } from "react";
// 子路由页面
export class HomeRanking extends PureComponent {
 
  render() {
    return (
      <div>
        <h2>Ranking Nav</h2>
        <h2>榜单数据</h2>
        <ul>
          <li>歌曲数据1</li>
          <li>歌曲数据2</li>
          <li>歌曲数据3</li>
          <li>歌曲数据4</li>
          <li>歌曲数据5</li>
        </ul>
      </div>
    );
  }
}

export default HomeRanking;
