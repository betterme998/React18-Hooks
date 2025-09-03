import React, { PureComponent } from "react";
import ThemeContext from "./context/theme_context";
import Product from "./pages/Product";

export class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 通过高级组件封装把上下文数据传入组件. */}
        <ThemeContext value={{ color: "red", fontSize: "20px" }}>
          {/* 子组件导出时被高阶组件（with_context）封装，并传入了上下文数据,传到了props中 */}
          <Product />
        </ThemeContext>
      </div>
    );
  }
}

export default App;
