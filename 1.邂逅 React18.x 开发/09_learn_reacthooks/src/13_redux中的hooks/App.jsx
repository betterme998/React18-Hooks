// useSelector的浅比较性能优化
import React, { memo } from "react";
// shallowEqual是浅比较，如果两个对象相同，则返回true
// useSelector，useDispatch用于在组件中获职store中的数据开派发action
// useSelector接收两个参数，第一个是回调函数，第二个是浅比较函数
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addNumberAction,
  changeMessageAction,
  subNumberAction,
} from "./store/modules/counter";

// memo高阶组件包裹起来的组件有对应的特点：只有props发生改变时，才会重新渲染
// 但是home组件并没有传入props，但是点击按钮，home组件也会重新渲染
// 原因：useSelector其实是对整个state进行监听，只要store中数据发生变化，组件就会重新渲染

// 解决：useSelector第二个参数传入shallowEqual，进行浅比较
// 只有当前一个state和下一个state相同，组件就不会重新渲染
const Home = memo((props) => {
  const { message } = useSelector(
    (state) => ({
      message: state.counter.message,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  function changeMessageHandle() {
    dispatch(changeMessageAction("hahahha"));
  }

  console.log("Hoome");

  return (
    <div>
      <h2>Home: {message}</h2>
      <button onClick={(e) => changeMessageHandle()}>修改message</button>
    </div>
  );
});

const App = memo((props) => {
  // 1.使用useselector将redux中store的数据映射到组件内
  const { count } = useSelector(
    (state) => ({
      count: state.counter.count,
    }),
    shallowEqual
  );
  console.log("app");

  // 2.使用useDispatch直接派发action
  const dispatch = useDispatch();
  function addNumberHandle(num, isAdd = true) {
    isAdd ? dispatch(addNumberAction(num)) : dispatch(subNumberAction(num));
  }

  return (
    <div>
      <h2>当前计数：{count}</h2>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(6)}>+6</button>
      <button onClick={(e) => addNumberHandle(6, false)}>-6</button>
      <Home />
    </div>
  );
});

export default App;

// node =>Vue/React服务器端渲染APl=>nuxt/next
// 要想学号nuxt/next,需要先学会node和vue/react

//SPA: 单页面富应用的两个问题
//1.首屏的渲染速度
// 2.不利于SEO优化

// 1.单页面富应用如何在浏览器中渲染出来的？
// 浏览器做了哪些操作呢？
// 浏览器会根据域名或者ip地址找到对应的服务器，去服务器里请求对应的文件（一个文件）index.html
// 思考一下一个SPA页面，index.html里面有东西吗？
// 基本上是没有的
// 自己搭建webpack的环境 => index.html =>body里面什么都没有，只有一个div#app

// SEO优化：搜索引擎优化
// 百度，它有很多台服务器，24小时不关机的情况下，不断去网络上面爬取数据
// 它去爬取就是把index.html下载下来，如果爬其他东西太消耗性能
// 所以它在收录网站的时候，最主要收入的index.html里面配置的meta配置，或者body里的内容
// 收录到数据库里面后，会根据关键字匹配，当用户百度一下搜索关键字的时候
// 因为收录的信息很少，所以网站排名可能非常靠后，用户就不可能打开你的网站，不会给网站带来流量
// 所以SPA页面非常不利于SEO优化
// 如果可以把网站所以内容爬下来，那么在收录的时候网站就会比较靠前
// 因为我们是SPA页面，所以百度爬取到的内容会很少，在收录的时候匹配度很低，排名就靠后

// 首屏的渲染速度
// 早期的SSR的页面：JSP，它是在服务器里面把整个网站渲染好，当我们去请求的时候是把整个网页请求下来的
// 拿到完整的页面后，首先从爬虫的角度，可以爬更多的数据，匹配度更高，有利于SEO优化
// 因为直接下载下来就是一个完整的页面，意味着浏览器直接渲染整个网站就行了
// 那SPA下载下来的就是一个空的index.html
// 在index.html页面中有script src = "xxx.js"
// 我们需要从服务器里再下载js文件，如果没有做分包处理，js文件会非常大，意味着下载时间长
// 下载完后,浏览器还要执行xxx.js文件代码，执行完后，再去渲染页面
