import {
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import HomeRecommend from "./pages/HomeRecommend";
import HomeRanking from "./pages/HomeRanking";
import Category from "./pages/Category";
import Order from "./pages/Order";
import HomeSongMenu from "./pages/HomeSongMenu";
import "./style.css";

/*
1.对路由进行安装
2.对<App/>使用HashRouter包裹，或者BrowserRouter包裹
3.配置路由映射关系
4.写<Link>跳转路径
*/
export function App(props) {
  // hook只能在函数式组件使用，那有什么办法在类组件使用hook函数？
  // 高阶组件：传入一个navigate
  let navigate = useNavigate();

  function navigateTo(path) {
    // 手动跳转路由的hook函数useNavigate
    // hook函数只能在函数式组件使用
    // 返回一个函数
    navigate(path);
  }

  return (
    <div className="app">
      <div className="header">
        <span>header</span>
        <div className="nav">
          {/* 
            口通常路径的跳转是使用Link组件，最终会被渲染成a元素
            口 NavLink是在Link基础之上增加了一些样式属性(后续学习) 一般不用
            口 to属性:Link中最重要的属性，用于设置跳转到的路径
            */}
          <Link to="/home">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/login">登录</Link>

          {/* 手动跳转路由 */}
          <button onClick={(e) => navigateTo("/category")}>分类</button>
          <span onClick={(e) => navigateTo("/order")}>订单</span>

          {/* 点击后会自动添加active className属性 */}
          <NavLink to="/about">关于</NavLink>
          {/* NavLink可以接收style属性，该属性是一个函数（用于定义样式），返回一个对象，可以对对象进行结构，{ isActive }表示是否是active */}
          <NavLink
            to="/about"
            style={({ isActive }) => ({ color: isActive ? "red" : "" })}
          >
            关于
          </NavLink>
          {/* NavLink可以接收className属性，该属性是一个函数，返回一个对象，可以对对象进行结构 { isActive } 布尔值。是否选中*/}
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            关于
          </NavLink>
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
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}>
            {/* 嵌套路由 */}
            <Route path="/home" element={<Navigate to="/home/recommend" />} />
            <Route path="/home/recommend" element={<HomeRecommend />} />
            <Route path="/home/ranking" element={<HomeRanking />} />
            <Route path="/home/songmenu" element={<HomeSongMenu />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="footer">
        Footer
        <hr />
      </div>
    </div>
  );
}

export default App;
