# React18-Hooks

React18 全家桶+Hooks+项目实战

# 1.到底什么是 React？

.官方解释：用于构建用户界面的 JavaScript 库
1.1 React 的技术特点
.React 由 Facebook 来更新和维护，它是大量优秀程序员的思想结晶
.大量流行的其他框架借鉴 React 的思想
--Vue Composition API 学习了 React Hooks 的思想

# 2.三大框架流行趋势

.Vue, React, Angular

# 3.如何学习 React？

1.官方文档
.如何抓住重点
.如何进行实战练习
.更多作为查阅的手册

2.看书学习
.书的质量必须很高
.必须收到进行练习
.遇到问题如何解决

3.开源项目
.非常好的学习手段
.需要具备一定的学习能力，需要一定基础

4.视频课程
.比较适合大多数人
.讲课人本身的能力
.视频质量要高，听得懂，学得会

# 4.课程核心内容介绍

# 4.1.邂逅 React18.x 开发

.React 的介绍和特点
.React 是什么？
.React:用于构建用户界面的 JavaScript 库
.React 的官网文档：https://zh-hans.reactjs.org/
.声明式：当数据变动时 React 能高效更新并渲染合适的组件
.组件化：组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离
.一次学习，跨平台编写：React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用

.Hello React 案例

.在界面显示一个文本：Hello World
.点击下方的一个按钮，点击后文本改变为 Hello React

.React 开发 1 依赖分析
1.react：包含 react 所必须的核心代码
2.react-dom：react 渲染在不同平台所需要的核心代码
3.babel：将 jsx 转换成 React 代码的工具

一.第一次接触 React 会被它频繁的依赖搞蒙，居然依赖这么多东西
.对 Vue 来说，我们只是依赖一个 Vue.js 文件即可，但是 react 居然要依赖三个包
.其实呢，这三个库是各司其职的，目的就是让每个库只单纯做自己的事情
.在 React 的 0.14 版本之前是没有 react-dom 这个概念的，所有功能都包含在 react 里

二.为什么要进行拆分呢？原因就是 react-native
.react 包中包含了 react web 和 react-native 所有共同拥有的核心代码
.react-dom 针对 web 和 native 所完成的事情不同：
-1.web 端：react-dom 会将 jsx 最终渲染成真实的 DOM，显示在浏览器中
-2.native 端：react-dom 会将 jsx 最终渲染成原生的控件（比如 Android 中的 Button，IOS 中的 UIButton）

三.babel 是什么？
.Babel，又名 Babel.js
.是目前前端使用非常广泛的编译器，转移器.
.比如当下很多浏览器并不支持 ES6 的语法，但是确实 ES6 的语法非常的简洁和方便，我们开发时希望使用它.
.那么编写源码时我们就可以使用 ES6 来编写，之后通过 Babel 工具，将 ES6 转成大多数浏览器都支持的 ES5 的语法

四.React 和 Babel 的关系
.默认情况下开发 React 可以不使用 babel。
.但是前提是我们自己使用 React.createElement 来编写源代码，它编写的代码非常的繁琐和可读性差。
.那么我们就可以直接编写 jsx（JavaScript XML）的语法，并且让 babel 帮助我们转换成 React.createElement.
.使用 babel 转化代码，会默认启用"use strict"，变成严格环境

# React 组件化的封装

1.整个逻辑其实可以看做一个整体，那么我们就可以将其封装成一个组件：
.我们说过 root.render 参数是一个 HTML 元素或者一个组件；
.所以我们可以先将之前的业务逻辑封装到一个组件中，然后传入到 ReactDOM.render 函数中的第一个参数

2.在 React 中，如何封装一个组件呢？这里我们暂时使用类的方式封装组件
.定义一个类（类名大写，组件的名称是必须大写的，小写会被认为是 HTML 元素）。继承自 React.Component
.实现当前组件的 render 函数
.-rander 当中返回的 jsx 内容，就是之后 React 会帮助我们渲染的内容

# 组件化-数据依赖

.组件化问题一：数据在哪里定义？
.组件中的数据，我们可以分成两类
.1.参与界面更新的数据：当数据变量时，需要更新组件渲染的内容；
.2.不参与界面更新的数据：当数据变量时，不需要更新将组建渲染的内容

.参与界面更新的数据我们可以称为是：参与数据流，这个数据是定义在当前对象的 state 中
.我们可以通过在构造函数中 this.state = {定义的数据}
.当我们的数据发生变化时，我们可以调用 this.setState 来更新数据，并且通知 React 进行 updata 操作
.在进行 update 操作时，就会重新调用 render 函数。并且使用最新的数据，来渲染界面
.在类里面，默认就是严格模式
.类组件里面 render 函数当中的 this，指向的是当前实例
.类组件里面的方法当中的 this 指向 undefined

# 组件化-事件绑定

1.组件化问题二：事件绑定中的 this
.在类中直接定义一个函数，并且将这个函数绑定到元素的 onClick 事件上，这个函数的 this 指向的是谁？ 2.默认情况下是 undefined 2.默认情况下是 underfined
.很奇怪，居然是 undefined
.因为在正常的 DOM 操作中，监听点击，监听函数中的 this 其实是节点对象（比如说是 button 对象）；
.这次因为 React 并不是直接渲染成真实的 DOM，我们所编写的 button 只是一个语法糖，它本质是 React 的 Element 对象；
.那么在这里发生监听的时候，react 在执行函数时并没有绑定 this，默认情况下就是 undefined 3.我们在绑定的函数中，可能想要使用当前对象，比如执行 this.setState 函数，就必须拿到当前对象的 this
.我们就需要在传入函数时，给这个函数直接绑定 this
.类似于下面的写法：<button onClick={this.changeText.bind(this)}>改变文本</button>

# 生成代码片段

.1.复制自己需要生成代码片段的代码；
.2.https://snippet-generator.app/在该网站中生成代码片段
.3.在 VSCode 中配置代码片段

.React 数据事件处理
.React 其他案例实现

# React 基础 - JSX 语法

1.JSX 是什么？
.JSX 是一种 JavaScript 的语法扩展(eXtension),也在很多地方称之为 JavaScript XML，因为看起来就是一段 XML 语法；
.它用于描述我们 UI 界面，并且其完全可以和 JavaScript 融合在一起使用
例子：const element = <h1>Hello, world!</h1>;
html 写进了 js（html in js），css 也可以写进去（css in js），所以也可以成为 all in js

问题：为什么 React 选择 JSX？
React 认为渲染逻辑本质上与其他 UI 逻辑存在内在耦合（html 和 js），比如，在 UI 中需要绑定事件（button，a 原生）、状态等。
他们之间是密不可分，所以 React 没有标记分离到不同的文件中，而是将它门组合到一起，这个地方就是组件（Component）
.这里我们只需要知道，JSX 其实是嵌入到 JavaScript 中的一种结构语法

.JSX 的书写规范
--JSX 的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 div 元素
--为了方便阅读，我们通常在 jsx 的外层包裹一个小括号(),这样可以方便阅读，并且 jsx 可以进行换行书写
--JSX 中的标签可以是单标签，叶可以是双标签，单标签，必须以/>结尾

2.JSX 的基本使用
.JSX 的注释：{/_ 注释内容 _/}

2.1.JSX 嵌入变量作为子元素
.情况一：当变量是 Nunber，String，Array 类型时，可以直接显示
.情况二：当变量是 null，undefined，Boolean 类型时，内容为空
--如果希望可以显示 null，undefined，false，需要转成字符串
--转换的方式有很多，比如 toString 方法，和空字符串拼接，String(变量)等
.情况三：Object 对象类型不能作为子元素

2.2.JSX 嵌入表达式
.运算表达式
.三元运算符
.执行一个函数

2.3.JSX 的使用
.jsx 绑定属性
..比如元素都会有 title 属性
..比如 img 元素会有 src 属性
..比如 a 元素会有 href 属性
..比如元素可能需要绑定 class
..比如原生使用内联样式 style

3.JSX 的事件绑定
.如果原生 DOM 原生有一个监听事件，我们可以如何操作呢?
..方式一：获取 DOM 原生，添加监听事件
..方式二：在 HTML 原生中，直接绑定 onclick

.在 React 中是如何操作呢？我们来实现一下 React 中的事件监听，这里主要有两点不同
..React 事假的命名采用小驼峰（camelCase），而不是纯小写；
..我们需要通过{}传入一个事件处理函数，这个函数会在事件发生时被执行

this 的绑定问题
.在事件执行后，我们可能需要获取当前类的对象中相关的属性，这个时候需要用到 this
..如果我们直接打印 this，会发现是 undefined

.为什么是 undefined 呢？
..原因是 btnClick 函数并不是我们主动调用的，而且当 button 发生改变时，React 内部调用了 btnClick 函数；
..而它内部调用时，并不知道如何绑定正确的 this；

.如何解决 this 的问题呢？
..方案一：bind 给 btnClick 显示绑定 this
..方案二：使用 ES6 class fields 语法
..方案三：事假监听时传入箭头函数（个人推荐）

事件参数传递
■ 在执行事件函数时，有可能我们需要获取一些参数信息:比如 event 对象、其他参数
■ 情况一:获取 event 对象
口 很多时候我们需要拿到 event 对象来做一些事情(比如阻止默认行为)
口 那么默认情况下，event 对象有被直接传入，函数就可以获取到 event 对象;
情况二:获取更多参数
口有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数

4.JSX 的条件渲染
React 条件渲染
某些情况下，界面的内容会根据不同的情况显示不同的内容，或者决定是否渲染某部分内容:
口 在 vue 中，我们会通过指令来控制:比如 v-if、v-show;
口 在 React 中，所有的条件判断都和普通的 JavaScript 代码一致;

常见的条件渲染的方式有哪些呢?
方式一:条件判断语句
口 适合逻辑较多的情况
方式二:三元运算符
口 适合逻辑比较简单
方式三:与运算符&&
口 适合如果条件成立，渲染某一个组件;如果条件不成立，什么内容也不染;
■v-show 的效果
口 主要是控制 display 属性是否为 none

5.JSX 的列表渲染
React 列表渲染
.真实开发中我们会从服务器请求到大量的数据。数据会以列表的形式存储
.-比如歌曲，歌手，排行榜列表的数据;
口 比如商品、购物车、评论列表的数据;
口 比如好友消息、动态、联系人列表的数据;

.在 React 中手没有像 Vue 模块语法中的 v-for 指令而且要要我们诵过 Java 式组织数据，转成 JSX
口 很多从 Vue 转型到 React 的同学非常不习惯，认为 Vue 的方式更加的简洁明了
口 但是 React 中的 JSX 正是因为和 JavaScript 无缝的衔接，让它可以更加的灵活
口 另外我经常会提到 React 是真正可以提高我们编写代码能力的一种方式;

如何展示列表呢?
口 在 React 中，展示列表最多的方式就是使用数组的 map 高阶函数

很多时候我们在展示一个数组中的数据之前，需要先对它进行一些处理:
口 比如过滤掉一些内容:filter 函数
口 比如截取数组中的一部分内容:slice 函数

列表中的 key
■ 这个警告是告诉我们需要在列表展示的 jsx 中添加一个 key。
口 key 主要的作用是为了提高 diff 算法时的效率;
口 这个我们在后续内容中再进行讲解:

6.JSX 的原理和本质
实际上，jsx 仅仅只是 React.createElement(component,props,...children) 函数的语法糖。
口 所有的 jsx 最终都会被转换成 React.createElement 的函数调用。

■createElement 需要传递三个参数:
参数-:type
口当前 ReactElement 的类型;
口 如果是标签元素，那么就使用字符串表示“div”
口 如果是组件元素，那么就直接使用组件的名称;
参数二:config
口 所有 jsx 中的属性都在 config 中以对象的属性和值的形式存储;口比如传入 className 作为元素的 class;
参数三:children
口 存放在标签中的内容，以 children 数组的方式进行存储;口 当然，如果是多个元素呢?React 内部有对它们进行处理，处理的源码在下方

# 4.2.React18.x 的核心语法

# 4.3.Rudex 状态管理使用

# 4.4.React Router6.x 路由

# 4.5.React Hooks 的使用详解

# 4.6.今日头条或爱彼迎 PC 实战

# 4.7.React 项目的自动化部署

# 5.哪些人适合学习？

.
