import { createContext } from "react";
// 第一步操作：创建一个上下文对象
// 1.创建一个Context 上下文
export const ThemeContext = createContext({ color: "red" });

export default ThemeContext;
