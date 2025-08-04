import { createStore } from "redux";
// 3.导入reducer函数
import reducer from "./reducer";

// 1.创建store,
// 2.需要传入一个reducer函数->创建reducer.js文件
const store = createStore(reducer);

export default store;
