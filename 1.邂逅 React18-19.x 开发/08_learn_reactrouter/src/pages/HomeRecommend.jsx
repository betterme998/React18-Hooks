import React, { PureComponent } from "react";
// 子路由页面
export class HomeRecommend extends PureComponent {
  render() {
    return (
      <div>
        <h2>Banner</h2>
        <h2>歌单的列表</h2>
        <ul>
          <li>歌单数据01</li>
          <li>歌单数据02</li>
          <li>歌单数据03</li>
          <li>歌单数据04</li>
        </ul>
      </div>
    );
  }
}

export default HomeRecommend;
