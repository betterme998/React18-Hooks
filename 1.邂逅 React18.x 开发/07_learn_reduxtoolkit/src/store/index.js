import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter";
import homeReducer from "./features/home";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
});

export default store;

/*

■ Redux Toolkit 的核心 API 主要是如下几个:
口 configureStore:包装 createStore 以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，redux-thunk 默认包含，并启用 Redux DevTools Extension.
口 createSlice:接受 reducer 函数的对象、切片名称和初始状态值，并自动生成切片 reducer，并带有相应的 actions.
口 createAsyncThunk:接受一个动作类型字符串和一个返回承诺的函数，并生成一个 pending/fulfilled/rejected 基于该承诺分派动作类型的 thunk

store的创建
■configureStore用于创建store对象，常见参数如下:
口reducer，将slice中的reducer可以组成一个对象传入此处
口 middleware:可以使用参数，传入其他的中间件(自行了解)
口 devTools:是否配置devTools工具，默认为true
*/
