import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";

import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 使用react-redux将 react和redux结合使用，两个步骤，一.使用Provider包裹<App/>并传递state数据 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
/*
■ 安装 Redux Toolkit
.1.创建项目：create-react-app 07_learn_reduxtoolkit  
.2.安装 redux-toolkit 和 react-redux: npm install @reduxjs/toolkit react-redux
.3.创建store文件夹-> index.js
.4.创建features文件夹
 
■ Redux Toolkit 的核心 API 主要是如下几个:
口 confiqureStore:包装 createStore 以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，redux-thunk 默认包含，并启用 Redux DevTools Extension.
口 createSlice:接受 reducer 函数的对象、切片名称和初始状态值，并自动生成切片 reducer，并带有相应的 actions.
口 createAsyncThunk:接受一个动作类型字符串和一个返回承诺的函数，并生成一个 pending/fulfilled/rejected 基于该承诺分派动作类型的 thunk
*/
