import React, { PureComponent } from "react";
import enhancedUserInfo from "../hoc/enhanced_props";

export class Abouts extends PureComponent {
  render() {
    return <div>Abouts</div>;
  }
}

// 导出时增强组件
export default enhancedUserInfo(Abouts);
