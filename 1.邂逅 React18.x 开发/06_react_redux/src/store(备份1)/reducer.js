import * as actionTypes from "./constants";
// 通常做两件事情
// 1.创建初始值

const initialState = {
  counter: 100,

  banners: [],
  recommends: [],
};

// 2.创建reducer函数,接收两个参数,一个是state,一个是action
// state = initialState是为了在没有传入state时使用初始值

// action 是store.dispatch()派发到这里
function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_NUMBER:
      return { ...state, counter: state.counter + action.num };
    case actionTypes.SUB_NUMBER:
      return { ...state, counter: state.counter - action.num };
    case actionTypes.CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    case actionTypes.CHANGE_RECOMMENDS:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}

export default reducer;
