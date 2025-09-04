import { configureStore } from "@reduxjs/toolkit";

// 导出普通方式的reducer文件
import entireReducer from "./modules/entire";

import homeReducer from "./modules/home";

// 1.配置store
const store = configureStore({
  reducer: {
    // 合并配置多个reducer
    // 不管是使用createSlice 还是普通方式创建的reducer，都会合并
    home: homeReducer,
    entire: entireReducer,
  },
});

export default store;
