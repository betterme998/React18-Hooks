import React, { PureComponent } from "react";
// 导入由styled-components生成的组件，用它代替div
import { AppWrapper, SectionWrapper } from "./style";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      size: 30,
      color: "yellow",
    };
  }
  render() {
    const { size, color } = this.state;
    return (
      // 可以对子元素进行样式控制
      <AppWrapper>
        {/* 因为是组件，所以可以传入参数 */}
        <SectionWrapper size={size}>
          <h2 className="title">我是标题</h2>
          <p className="content">我是内容，哈哈哈</p>
          {/* 动态修改样式 */}
          <button onClick={(e) => this.setState({ color: "skyblue" })}>
            修改颜色
          </button>
        </SectionWrapper>
        <div className="footer">
          <p>免责声明</p>
          <p>版权声明</p>
        </div>
      </AppWrapper>
    );
  }
}

export default App;
