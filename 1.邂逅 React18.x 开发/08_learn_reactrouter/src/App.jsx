import React, { PureComponent } from "react";
import { Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
/*
1.对路由进行安装
2.对<App/>使用HashRouter包裹，或者BrowserRouter包裹
3.配置路由映射关系
4.写<Link>跳转路径
*/
export class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <div className="header">
          <span>header</span>
          <div className="nav">
            <Link to="/home">首页</Link>
            <Link to="/about">关于</Link>
          </div>
          <hr />
        </div>
        <div className="content">
          {/* 3.映射关系：path => Component */}

          <Routes>
            {/* 
              Route:Route用于路径的匹配;
                口 path属性:用于设置匹配到的路径
                口 element属性:设置匹配到路径后，渲染的组件，
            */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <div className="footer">
          Footer
          <hr />
        </div>
      </div>
    );
  }
}

export default App;
