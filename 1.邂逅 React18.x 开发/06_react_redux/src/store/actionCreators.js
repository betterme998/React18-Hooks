// 动态生成action

import * as actionType from "./constants";
import axios from "axios";

export const addNumberAction = (num) => ({
  type: actionType.ADD_NUMBER,
  num,
});

export const subNumberAction = (num) => ({
  type: actionType.SUB_NUMBER,
  num,
});

export const changeBannersAction = (banners) => ({
  type: actionType.CHANGE_BANNERS,
  banners,
});
export const changeRecommendsAction = (recommends) => ({
  // 定义action类型
  type: actionType.CHANGE_RECOMMENDS,
  // 推荐列表
  recommends,
});

// // 异步action
export const fetchHomeMultidataAction = () => {
  // 如果是一个普通的action，那么我们需要返回一个对象
  // 问题：对象中是不能直接拿到从服务器请求的异步数据的
  // 解决：返回一个函数
  // 如果返回一个函数，那么redux是不支持的
  // 需要使用redux-thunk中间件来处理异步action

  // action传递函数时，会给函数传入两个参数：dispatch和getState

  return (dispatch, getState) => {
    // 异步操作：网络请求
    // console.log("foo function called");

    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 拿到数据后，派发action保存到store中

      dispatch(changeBannersAction(banners));
      dispatch(changeRecommendsAction(recommends));
    });
  };
};
