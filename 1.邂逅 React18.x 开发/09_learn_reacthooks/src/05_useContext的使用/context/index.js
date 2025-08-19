import { createContext } from "react";

// 多个context
const UserContext = createContext(); // 共享用户数据的
const ThemeContext = createContext(); //共享主题的
// context 上下文环境，用于共享数据，类似于全局变量
// 根组件得包裹在 context的 Provider中才能使用:index.js中有演示

export { UserContext, ThemeContext };
