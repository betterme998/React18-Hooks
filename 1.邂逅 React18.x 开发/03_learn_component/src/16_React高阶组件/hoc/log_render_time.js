import { PureComponent } from "react";
/*
页面渲染时间统计
*/
function logRenderTime(OriginComponent) {
  // 可以省略类的名字
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      // 记录渲染开始时间
      this.beginTime = new Date().getTime();
    }

    componentDidMount() {
      this.endTime = new Date().getTime();
      console.log(
        `当前${OriginComponent.name}页面花费了${
          this.endTime - this.beginTime
        }ms`
      );
    }
    render() {
      return <OriginComponent {...this.props} />;
    }
  };
}
export default logRenderTime;
