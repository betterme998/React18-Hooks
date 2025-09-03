// 详情页面
import React, { PureComponent } from "react";
import logRenderTime from "../hoc/log_render_time";

/*
想要看这个页面的渲染时间，就是rander函数调用过程
如果每个页面都需要记录渲染时间，那么就需要在每个页面中都写一遍这个过程，显然是不现实的。
可以通过封装高阶函数log_render_time来实现，


*/
export class Detail extends PureComponent {
  // // 不推荐使用这个生命周期
  // UNSAFE_componentWillMount() {
  //   // 记录渲染开始时间
  //   this.beginTime = new Date().getTime();
  // }

  // componentDidMount() {
  //   this.endTime = new Date().getTime();
  //   console.log(`当前页面花费了${this.endTime - this.beginTime}ms`);
  // }
  render() {
    return (
      <div>
        <h2>Detail Page</h2>
        <ul>
          <li>数据列表1</li>
          <li>数据列表2</li>
          <li>数据列表3</li>
          <li>数据列表4</li>
          <li>数据列表5</li>
          <li>数据列表6</li>
          <li>数据列表7</li>
          <li>数据列表8</li>
          <li>数据列表9</li>
          <li>数据列表10</li>
        </ul>
      </div>
    );
  }
}

export default logRenderTime(Detail);
