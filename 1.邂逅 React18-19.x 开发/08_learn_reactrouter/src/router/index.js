/*
路由的配置文件
*/
// 这些都是同步加载，会被打包到提供js文件当中
import Home from "../pages/Home";
// import About from "../pages/About";
// import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import HomeRecommend from "../pages/HomeRecommend";
import HomeRanking from "../pages/HomeRanking";
import Category from "../pages/Category";
import Order from "../pages/Order";
import HomeSongMenu from "../pages/HomeSongMenu";
import Detail from "../pages/Detail";
import User from "../pages/User";
import { Navigate } from "react-router";
import React from "react";

// 进行分包处理,懒加载组件，就不会打包到一个js文件中
// lazy要求传入函数,这个函数要求：返回一个promise对象
// import() 动态传入模版路径，返回promise对象
// 懒加载后会打包到独立的js文件中
// 要在页面中使用懒加载组件需要使用Suspense包裹组件,fallback属性可以传入一个加载中的组件用于过度效果
// 通常包裹根组件<App/>
const About = React.lazy(() => import("../pages/About"));
const Login = React.lazy(() => import("../pages/Login"));

// 路由配置文件
const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/recommend" />,
      },
      {
        path: "/home/recommend",
        element: <HomeRecommend />,
      },
      {
        path: "/home/ranking",
        element: <HomeRanking />,
      },
      {
        path: "/home/songmenu",
        element: <HomeSongMenu />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
