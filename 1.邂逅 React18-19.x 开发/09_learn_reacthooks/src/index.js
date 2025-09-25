import React from "react";
import ReactDOM from "react-dom/client";
// import { UserContext, ThemeContext } from "./05_useContext的使用/context";
import { UserContext, TokenContext } from "./12_自定义Hooks/context";
import { Provider } from "react-redux";
import store from "./13_redux中的hooks/store";

// import App from "./01_不使用Hook/App";
// import App from "./02_计算器实现对比/App";
// import App from "./03_useState的使用/App";
// import App from "./04_useEffect的使用/05_执行时机-控制回调执行";
// import App from "./05_useContext的使用/App";
// import App from "./06_useReducer的使用(了解)/App";
import App from "./07_useCallback的使用/App";
// import App from "./08_useMemo的使用/App";
// import App from "./09_useRef的使用/App";
// import App from "./10_uselmperativeHandle的使用/App";
// import App from "./11_useLayoutEffect使用/App";
// import App from "./12_自定义Hooks/App";
// import App from "./13_redux中的hooks/App";
// import App from "./14_useId的使用/App";
// import App from "./15_useTransition使用/App";
// import App from "./16_useActionState的使用/02_form的action增强的使用";
// import App from "./17_useOptimistic的使用/App";
// import App from "./18_use_API的使用/App";
// import App from "./19_ref的更新/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     {/* 给app共享用户数据和主题数据 */}
//     {/*
//      注意事项:
//      口 当组件上层最近的 <MyContext.Provider>更新时，该 Hook 会触发重新渲染，
//      并使用最新传递给 MyContext provider 的context value 值。 */}
//     <UserContext.Provider value={{ name: "why", level: 99 }}>
//       <ThemeContext.Provider value={{ color: "red", size: 30 }}>
//         <App />
//       </ThemeContext.Provider>
//     </UserContext.Provider>
//   </React.StrictMode>
// );
root.render(
  <React.StrictMode>
    {/* 给app共享用户数据和主题数据 */}
    {/* 
     注意事项:
     口 当组件上层最近的 <MyContext.Provider>更新时，该 Hook 会触发重新渲染，
     并使用最新传递给 MyContext provider 的context value 值。 */}
    <UserContext.Provider value={{ name: "why", level: 99 }}>
      <TokenContext.Provider value={"coderwhy"}>
        <Provider store={store}>
          <App />
        </Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  </React.StrictMode>
);
// 为什么要使用Hooks？

// Hook是 React 16.8的新增特性，它可以让我们在不编写class的情况下使用state以及其他的React特性(比如生命周期)
// ■ 我们先来思考一下class组件相对于函数式组件有什么优势?比较常见的是下面的优势:
// ■ class组件可以定义自己的state，用来保存组件自己内部的状态，
// 口 函数式组件不可以，因为函数每次调用都会产生新的临时变量;

// ■ class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑，
// 口 比如在componentDidMount中发送网络请求，并且该生命周期函数只会执行一次;
// 口 函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求;

// ■ class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等:
// 口 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次;

// ■ 所以，在Hook出现之前，对于上面这些情况我们通常都会编写class组件。

// ------------------------------------------------------------------------------------
// Class组件存在的问题
// 1.复杂组件变得难以理解:
// 口 我们在最初编写一个class组件时，往往逻辑比较简单，并不会非常复杂。但是随着业务的增多，我们的class组件会变得越来越复杂,
// 口 比如componentDidMount中，可能就会包含大量的逻辑代码:包括网络请求、一些事件的监听(还需要在componentWillUnmount中移除):
// 口 而对于这样的class实际上非常难以拆分:因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度

// 2.难以理解的class:
// 口 很多人发现学习ES6的class是学习React的一个障碍,
// 口 比如在class中，我们必须搞清楚this的指向到底是谁，所以需要花很多的精力去学习this;
// 口 虽然我认为前端开发人员必须掌握this，但是依然处理起来非常麻烦

// 3.组件复用状态很难:
// 口 在前面为了一些状态的复用我们需要通过高阶组件;
// 口 像我们之前学习的redux中connect或者react-router中的withRouter，这些高阶组件设计的目的就是为了状态的复用
// 口 或者类似于Provider、Consumer来共享一些状态，但是多次使用Consumer时，我们的代码就会存在很多嵌套;
// 口 这些代码让我们不管是编写和设计上来说，都变得非常困难:

// ------------------------------------------------------------------------------------

// Hook的出现
// Hook的出现，可以解决上面提到的这些问题;
// 简单总结-下hooks:
// 口 它可以让我们在不编写class的情况下使用state以及其他的React特性
// 口 但是我们可以由此延伸出非常多的用法，来让我们前面所提到的问题得到解决

// Hook的使用场景:
// 口 Hook的出现基本可以代替我们之前所有使用class组件的地方
// 口 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它,
// 口 Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用

// 在我们继续之前，请记住 Hook 是:
// 口 完全可选的:你无需重写任何已有代码就可以在一些组件中尝试, Hook，但是如果你不想，你不必现在就去学习或使用 HooK
// 口 100% 向后兼容的:Hook不包含任何破坏性改动。
// 口 现在可用:Hook 已发布于 v16.8.0.

// ------------------------------------------------------------------------------------

// Class组件和Functional组件对比

// 1.计数器案例对比

// useState解析
// 那么我们来研究一下核心的一段代码代表什么意思:
// 口 useState来自react，需要从react中导入，它是一个hook;
//    参数:初始化值，如果不设置为undefined;
//    返回值:数组，包含两个元素
//      >元素一:当前状态的值(第一调用为初始化值);
//      >元素二:设置状态值的函数
//口 点击button按钮后，会完成两件事情:
//    调用setCount，设置一个新的值，
//    组件重新渲染，并且根据新的值返回DOM结构

// 自定义hooks
// hooks必须顶层调用
// 但是使用它们会有两个额外的规则:
//口 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用.
//口 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用

//-------------------------------------------------------------------------
// State Hook的API就是 useState，我们在前面已经进行了学习:
// 口 useState会帮助我们定义一个 state变量，useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。
//  √ 一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。
// 口 useState接受唯-一个参数，在第一次组件被调用时使用来作为初始化值。(如果没有传递参数，那么初始化值为undefined)。
// 口 useState的返回值是一个数组，我们可以通过数组的解构，来完成赋值会非常方便。

//--------------------------------------------------------------------------

//认识Effect Hook

// 目前我们已经通过hook在函数式组件中定义state，那么类似于生命周期这些呢?
// 口 Effect Hook 可以让你来完成一些类似于class中生命周期的功能;
// 口 事实上，类似于网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用(Side Effects)
// 口 所以对于完成这些功能的Hook被称之为 Effect Hook;
