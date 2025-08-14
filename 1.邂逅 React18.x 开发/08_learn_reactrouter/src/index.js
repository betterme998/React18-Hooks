import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    {/* 2.开启路由功能 */}
    {/* hash的特点是路径前面加上#号：http://localhost:3000/#/home */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);

/*
.1.认识 React-Router
■ 路由其实是网络工程中的一个术语:
口 在架构一个网络时，非常重要的两个设备就是路由器和交换机。
口 当然，目前在我们生活中路由器也是越来越被大家所熟知，因为我们生活中都会用到路由器
口 事实上，路由器主要维护的是一个映射表;
口 映射表会决定数据的流向;

■ 路由的概念在软件工程中出现，最早是在后端路由中实现的，原因是 web 的发展主要经历了这样一些阶段:
口 后端路由阶段;
口 前后端分离阶段;
口 单页面富应用(SPA);

后端路由阶段

■ 早期的网站开发整个 HTML 页面是由服务器来渲染的.
口 服务器直接生产渲染好对应的 HTML 页面,返回给客户端进行展示.

■ 但是,一个网站,这么多页面服务器如何处理呢?
口 一个页面有自己对应的网址,也就是 URL;
口 URL 会发送到服务器,服务器会通过正则对该 URL 进行匹配,并且最后交给一个 Controller 进行处理;
口 Controller 进行各种处理,最终生成 HTML 或者数据,返回给前端.

■ 上面的这种操作,就是后端路由:
口 当我们页面中需要请求不同的路径内容时,交给服务器来进行处理,服务器渲染好整个页面,并且将页面返回给客户端
口 这种情况下渲染好的页面,不需要单独加载任何的 js 和 css,可以直接交给浏览器展示,这样也有利于 SEO 的优化.

■ 后端路由的缺点:
口 一种情况是整个页面的模块由后端人员来编写和维护的;
口 另一种情况是前端开发人员如果要开发页面,需要通过 PHP 和 Java 等语言来编写页面代码,
口 而且通常情况下 HTML 代码和数据以及对应的逻辑会混在一起,编写和维护都是非常糟糕的事情;

前后端分离阶段

■ 前端渲染的理解:
口 每次请求涉及到的静态资源都会从静态资源服务器获取，这些资源包括 HTML+CSS+JS，然后在前端对这些请求回来的资源进行渲染
口 需要注意的是，客户端的每一次请求，都会从静态资源服务器请求文件
口 同时可以看到，和之前的后端路由不同，这时后端只是负责提供 API 了

■ 前后端分离阶段:
口 随着 Ajax 的出现, 有了前后端分离的开发模式;
口 后端只提供 API 来返回数据，前端通过 Ajax 获取数据，并且可以通过 JavaScript 将数据渲染到页面中
口 这样做最大的优点就是前后端责任的清晰，后端专注于数据上，前端专注于交互和可视化上;
口 并且当移动端(i0S/Android)出现后，后端不需要进行任何处理，依然使用之前的一套 API 即可;
口 目前比较少的网站采用这种模式开发;

■ 单页面富应用阶段:
口 其实 SPA 最主要的特点就是在前后端分离的基础上加了一层前端路由
口 也就是前端来维护一套路由规则.

■ 前端路由的核心是什么呢?改变 URL，但是页面不进行整体的刷新。

■ 最早改变 url 不进行整体刷新通过：

■ 1.URL 的 hash
口 URL 的 hash 也就是锚点(#),本质上是改变 window.location 的 href 属性
口 我们可以通过直接赋值 location.hash 来改变 href, 但是页面不发生刷新;

■ 2.HTML5 的 History
■ history 接口是 HTML5 新增的，它有六种模式改变 URL 而不刷新页面
口 replaceState:替换原来的路径;
口 pushState:使用新的路径
口 popState:路径的回退
口 go:向前或向后改变路径;
口 forward:向前改变路径
口 back:向后改变路径

认识 react-router

■ 目前前端流行的三大框架，都有自己的路由实现:
口 Angular 的 ngRouter
口 React 的 ReactRouter
口 Vue 的 vue-router

.2.Router 的基本使用

■ 安装 React Router:
口 安装时，我们选择 react-router-dom
口 react-router 会包含一些 react-native 的内容 web 开发并不需要:
口 npm install react-router-dom

■ react-router最主要的API是给我们提供的一些组件:
■ BrowserRouter或HashRouter
口 Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件;
口 BrowserRouter使用history模式;
口 HashRouter使用hash模式:

路由映射配置
■ Routes:包裹所有的Route，在其中匹配一个路由
口 Router5.x使用的是Switch组件

路由配置和跳转
■ Link和NavLink:
口 通常路径的跳转是使用Link组件，最终会被渲染成a元素
口 NavLink是在Link基础之上增加了一些样式属性(后续学习)
口 to属性:Link中最重要的属性，用于设置跳转到的路径;

NavLink的使用
■ 需求:路径选中时，对应的a元素变为红色■这个时候，我们要使用NavLink组件来替代Link组件:
口 style:传入函数，函数接受一个对象，包含isActive属性
口 className:传入函数，函数接受一个对象，包含isActive属性

Navigate导航
■ Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中:

■ 我们这里使用这个的一个案例:
口 用户跳转到Profile界面
口 但是在Profile界面有一个isLogin用于记录用户是否登录
√ true:那么显示用户的名称;
√ false:直接重定向到登录界面，

Not Found页面配置

路由的嵌套
■ 在开发中，路由之间是存在嵌套关系的。

■ 这里我们假设Home页面中有两个页面内容
口 推荐列表和排行榜列表;
口 点击不同的链接可以跳转到不同的地方，显示不同的内容

■ <Outlet>组件用于在父路由元素中作为子路由的占位元素，

手动路由的跳转
■ 目前我们实现的跳转主要是通过Link或者NavLink进行跳转的，实际上我们也可以通过JavaScript代码进行跳转。
口 我们知道Navigate组件是可以进行路由的跳转的，但是依然是组件的方式。
口 如果我们希望通过JavaScript代码逻辑进行跳转(比如点击了一个button)，那么就需要获取到navigate对象

■ 在Router6.x版本之后，代码类的API都迁移到了hooks的写法:
口 如果我们希望进行代码跳转，需要通过useNavigate的Hook获取到navigate对象进行操作;
口 那么如果是一个函数式组件，我们可以直接调用，但是如果是一个类组件呢?

路由参数传递

*/
