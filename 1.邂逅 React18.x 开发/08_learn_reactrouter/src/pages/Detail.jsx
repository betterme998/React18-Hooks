import React, { PureComponent } from "react";
// 高阶函数增强类组件，让其可以使用路由跳转参数
import { withRouter } from "../hoc";
/*

拿到路由跳转传递的id参数
// 方式一：
使用useParams()hooks函数拿到路由跳转参数
注意：这是类组件，需要使用高阶函数增强类组件
*/
export class Detail extends PureComponent {
  render() {
    // 拿到路由跳转传递的id参数
    const { router } = this.props;
    const { params } = router;

    return (
      <div>
        <h1>Detail Page</h1>
        {/* 显示路由跳转传递的id */}
        <h2> id: {params.id} </h2>
      </div>
    );
  }
}

export default withRouter(Detail);
