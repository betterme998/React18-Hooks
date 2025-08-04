// 通常做两件事情
// 1.创建初始值
const initialState = {
  counter: 100,
};

// 2.创建reducer函数,接收两个参数,一个是state,一个是action
// state = initialState是为了在没有传入state时使用初始值
function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
