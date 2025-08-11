// 在store中发送请求数据,并更新状态
// 使用createAsyncThunk

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 发送异步网络请求
export const fetchHomeMultidataAction = createAsyncThunk(
  "fetch/homemultidata",
  // 传递参数：extraInfo,state，是页面mapDispatchToProps传进来的参数，
  // 解构一下，拿到dispatch和getState

  async (extraInfo, { dispatch, getState }) => {
    const res = await axios.get("http://123.207.32.32:8000/home/multidata");
    // 怎么保存数据?
    // 方法一：直接在action中dispatch，这种方式不推荐

    // const banners = res.data.data.banner.list;
    // const recommends = res.data.data.recommend.list;
    // dispatch(changeBanners(banners));
    // dispatch(changeRecommends(recommends));

    // 方法二：通过createSlice的extraReducers监听异步请求回来的结果
    /*
    ■ 当 createAsyncThunk 创建出来的 action 被 dispatch 时，会存在三种状态
    口 pending:action 被发出，但是还没有最终的结果;
    口 fulfilled:获取到最终的结果(有返回值的结果)
    口 rejected:执行过程中有错误或者抛出了异常

    ■ 我们可以在createSlice的entraReducers中监听这些结果:
    */
    return res.data;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banners: [],
    recommends: [],
  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload;
    },
    changeRecommends(state, action) {
      state.recommends = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 这里是监听异步请求回来的结果：三种状态，1.pending,2.fulfilled,3.rejected
    // [obj.name]() 计算属性名，obj.name是动态的，这里就是动态函数名，执行这个函数
    // 传递两个参数：state,action

    // 网络请求回来的数据，我们通过action.payload获取到

    builder
      // { payload }对action解构赋值，payload 就是我们请求回来的数据
      .addCase(fetchHomeMultidataAction.pending, (state, { payload }) => {
        console.log("pending");
      })
      .addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
        console.log("fulfilled", payload);
        // 保存数据到state中
        state.banners = payload.data.banner.list;
        state.recommends = payload.data.recommend.list;
      })
      .addCase(fetchHomeMultidataAction.rejected, (state, { payload }) => {
        console.log("rejected");
      });
  },
});

// 在页面中使用
export const { changeBanners, changeRecommends } = homeSlice.actions;

// 在store-index.js中使用
export default homeSlice.reducer;
