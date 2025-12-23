// 使用@reduxjs/toolkit 方式
import { createSlice } from "@reduxjs/toolkit";

// 创建header的store片段
const headerSlice = createSlice({
  name: "header",
  initialState: {
    tabsKey: "1",
    segmented: "",
  },
  reducers: {
    // 改变tabsKey值，{payload}是对action的解构
    changeTabsKey(state, { payload }) {
      state.tabsKey = payload;
    },
    changeSegmented(state, { payload }) {
      state.segmented = payload;
    },
  },
});

// 导出actions
export const { changeTabsKey, changeSegmented } = headerSlice.actions;

// 在store-index.js中使用
export default headerSlice.reducer;
