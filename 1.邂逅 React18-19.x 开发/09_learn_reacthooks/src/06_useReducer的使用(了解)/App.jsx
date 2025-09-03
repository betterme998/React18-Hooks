// useReducer仅仅是useState的一种替代方案:
// 口 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分
// 或者这次修改的state需要依赖之前的state时，也可以使用:
import React, { memo, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    case "add_number":
      return { ...state, counter: state.counter + action.num };
    case "sub_number":
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

const App = memo(() => {
  // const [count, setCount] = useState(0);
  // 传入一个reducer函数和一个初始化的state值，返回一个数组,[state,dispatch]
  // state:当前的state值
  // dispath:分发action的函数，用来更新state值
  // 方式二：合并写（不推荐，因为处理函数要跑到reducer函数里面）
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
    friends: [],
    user: {},
  });

  // 方式一：分开写
  // const [counter, setCountter] = useState();
  // const [friends, setFriends] = useState();
  // const [user, setUser] = useState();
  return (
    <div>
      {/* 方式一 */}
      {/* <h2>当前计数:{count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
      <button onClick={(e) => setCount(count + 5)}>+5</button>
      <button onClick={(e) => setCount(count - 1)}>-1</button>
      <button onClick={(e) => setCount(count - 5)}>-5</button> */}

      {/* 方式二 */}

      <h2>当前计数:{state.counter}</h2>
      <button onClick={(e) => dispatch({ type: "increment" })}>+1</button>
      <button onClick={(e) => dispatch({ type: "add_number", num: 5 })}>
        +5
      </button>
      <button onClick={(e) => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={(e) => dispatch({ type: "sub_number", num: 5 })}>
        -5
      </button>
    </div>
  );
});

export default App;
