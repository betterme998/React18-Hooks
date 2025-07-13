import React, { PureComponent } from "react";
// 导入由styled-components生成的组件，用它代替div
import { AppWrapper } from "./style";

export class App extends PureComponent {
  render() {
    return (
      // 可以对子元素进行样式控制
      <AppWrapper>
        <div className="section">
          <h2 className="title">我是标题</h2>
          <p className="content">我是内容，哈哈哈</p>
        </div>
        <div className="footer">
          <p>免责声明</p>
          <p>版权声明</p>
        </div>
      </AppWrapper>
    );
  }
}

export default App;
