import React, { PureComponent } from "react";
import ThemeContext from "../context/theme_context";
import withTheme from "../hoc/with_theme";
// 在组件中获取上下文数据
export class Product extends PureComponent {
  //方法一： 类组价件写法，获取上下文数据
  // 指定上下文类型，在组件内部可以直接通过this.context访问上下文数据
  static contextType = ThemeContext;

  render() {
    console.log(this.context);

    return <div>Product:{this.props.color}</div>;
  }
}

// 方法二：在导出时增强组件，传入上下文数据
export default withTheme(Product);
