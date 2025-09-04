### 项目规范

项目规范:项目中有一些开发规范和代码风格  
1.文件夹、文件名称统一小写、多个单词以连接符(-)连接;  
2.JavaScript 变量名称采用小驼峰标识，常量全部使用大写字母，组件采用大驼峰;  
3.CSS 采用普通 CSS 和 styled-component 结合来编写(全局采用普通 CSS、局部采用 styled-component)  
4.整个项目不再使用 class 组件，统一使用函数式组件，并且全面拥抱 Hooks;  
5.所有的函数式组件，为了避免不必要的渲染，全部使用 memo 进行包裹;  
6.组件内部的状态，使用 useState、useReducer;业务数据全部放在 redux 中管理;  
7.函数组件内部基本按照如下顺序编写代码:  
 口 组件内部 state 管理;  
 口 redux 的 hooks 代码;  
 口 其他 hooks 相关代码(比如自定义 hooks);  
 口 组件内部的其他逻辑代码;  
 口 返回 JSX 代码;  
8.redux 代码规范如下:  
 口 redux 目前我们学习了两种模式，在项目实战中尽量两个都用起来，都需要掌握;  
 口 每个模块有自己独立的 reducer 或者 slice，之后合并在一起:  
 口 redux 中会存在共享的状态、从服务器获取到的数据状态;  
9.网络请求采用 axios  
 口 对 axios 进行二次封装，  
 口 所有的模块请求会放到一个请求文件中单独管理  
10.项目使用 AntDesign、MUl(Material Ul)  
 口 爱彼迎本身的设计风格更多偏向于 MaterialUl，但是课程中也会尽量讲到 AntDesiqn 的使用方法  
 口 项目中某些 AntDesign、MUl 中的组件会被拿过来使用;  
 口 但是多部分组件还是自己进行编写、封装、实现;

### 创建 React 项目

1.创建项目的方式:create-react-app

### 项目配置

口 配置项目的 icon  
口 配置项目的标题

<!-- jsconfig.json：智能提示 -->

口 配置 jsconfig.json  
口 通过 craco 配置别名和 less 文件:

### 项目目录结构划分

-src  
--assets

<!-- 多个项目都会用到的ui组件库 -->

--base-ui  
--components  
--hooks  
--router  
--services  
--store  
--utils  
--views  
--App.js  
--index.js  
--.gitignore  
--craco.config.js  
--jsconfig.json  
--package.json  
--package-lock.json  
--README.md

### 配置别名

为什么要配置别名？
引入路径太长如：../../../，不方便维护
@ => src ,在 webpack 中配置别名  
问题：react 脚手架隐藏 webpack  
解决一：npm run eject 暴漏 webpack 配置 （不推荐）  
解决二：craco => create-react-app config

1.安装依赖包  
npm install @craco/craco -D

2.创建 craco.config.js 配置文件  
-2.1 这是通过 node 加载的配置文件，所以需要使用 module.exports 导出配置项  
-2.2 这里的配置会和 webpack 的配置进行合并

3.修改 package.json  
-3.1 修改项目的启动命令  
--"start":"craco start"  
--"build": "craco build",  
--"test": "craco test",  
再次使用 npm run start 启动项目时，就会将 craco.config.js 配置合并到 webpack 配置中

### 配置 less

1.安装依赖包  
npm install craco-less -D

2.修改 craco.config.js 配置文件

### CSS 样式的重置

■ 1. 对默认 CSS 样式进行重置:  
口 normalize.css ：这是引入的 css 文件  
口 reset.css ：这是自己编写的 css 文件

1.安装依赖包  
npm install normalize.css

2.在 index.js 中引入

3.编写自己的 CSS 样式重置文件  
assets/css/reset.less

### 全家桶-Router 配置

1.安装依赖包  
npm istall react-router

2.导入路由两种模式其中一种 HashRouter 或者 BrowserRouter  
在 index.js 中导入  
import { HashRouter } from "react-router"  
并包裹 App 组件

创建页面  
home  
entire  
detail

3.配置路由  
3.1 在 router/index.js 中配置路由并导出  
3.2 在 App.jsx 中导入并使用  
3.3 使用异步加载组件  
需要注意：异步加载可能在切换时没有加载组件会报错，所以需要在 index.js 中使用 Suspense 包裹 HashRouter

### 全家桶-Redux 状态管理

Redux 状态管理的选择:  
口 普通方式:目前项目中依然使用率非常高:  
口 @reduxjs/toolkit 方式:推荐方式, 未来的趋势,

1.安装依赖包  
npm install @reduxjs/toolkit react-redux

2.配置 store  
2.1 在 store/index.js 中配置 store,并导出  
2.2 在 index.js 中导入 store，并使用 Provider 包裹 App 组件,并传入 store  
2.3 在 store/modules 中创建 reducer  
--这里使用两种方式进行状态管理：普通方式 和 @reduxjs/toolkit 方式 (确保掌握两种方式的使用方法)  
--创建 home.js 首页状态管理 ：使用@reduxjs/toolkit 方式  
--创建 entire 文件 ：使用普通方式  
并导出 reducer

：使用普通方式  
-- entire 文件  
----entire/index.js :入口文件  
----entire/createActions.js :创建 action  
----entire/constants.js :常量文件  
----entire/reducer.js: reducer 文件 （最重要文件）

注意我们普通方式创建的 reducer 文件，也可以合并@reduxjs/toolkit 方式创建的 reducer 中

2.4 创建好 home reducer 后，需要在 store/index.js 中合并 reducer

### 网络请求-axios

1.安装 axios  
npm install axios

2.封装 axios  
services/index.js ：统一出口文件  
services/request/index.js 文件：封装 axios 请求
services/request/config.js 配置文件
services/modules 文件夹：每个模块都有自己的独立文件来管理网络请求
