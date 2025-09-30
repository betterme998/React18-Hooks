// 使用普通方式 redux
// 最重要文件

const initialState = {};

// 在调用的时候会传入state,action，但是第一次没有state，给它一个初始值
function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
//
