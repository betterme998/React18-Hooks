import React, { PureComponent } from "react";

// 定义组件：给一些需要特殊数据的组件，注入props
function enhancedUserInfo(OriginComponent) {
  class NewComponent extends PureComponent {
    constructor() {
      super();
      this.state = {
        userInfo: {
          name: "John",
          age: 30,
          location: "New York",
          isLoggedIn: false,
        },
      };
    }
    // 高阶组件可以给原始组件注入一些额外的props
    render() {
      // 传人组件的props，并且传入一些额外的props
      // 当组件本身自己传入的props，是传入到高阶组件NewComponent的props中，所以要传入到返回组件中，

      return <OriginComponent {...this.props} {...this.state.userInfo} />;
    }
  }
  return NewComponent;
}

export default enhancedUserInfo;
