import React, { PureComponent } from "react";
import "./App.less";
/*
less 方式编写不会生效，原因：react 默认不支持less，类似webpack 需要安装对应的loader才可以。less-loader

决绝方案：
1.npm run eject 弹出配置文件，在里面添加对应的loader (不推荐，容易改错)
2.craco：create-react-app config  (推荐)
2.1 安装 craco:npm install @craco/craco
2.2:在项目根目录下创建 craco.config.js 文件
2.3:在package.json中修改scripts，将react-scripts改为craco，（使用craco启动项目，会合并less文件）

 


*/
export class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <div className="section">
          <h2 className="title">我是标题</h2>
          <p className="content">我是内容，哈哈哈</p>
        </div>
      </div>
    );
  }
}

export default App;
