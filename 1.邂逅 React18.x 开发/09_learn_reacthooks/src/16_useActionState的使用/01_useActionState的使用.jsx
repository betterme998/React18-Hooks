// useActionstate 接受一个函数(“Action”)，并返回一个被包装的用于调用的 Action。
// 这是因为 Actions 是可以组合的。当调用被包装的 Action时，
// useActionstate 将返回 Action的最后结果作为 data，以及 Action 的待定状态作为 pending

// 返回三个参数，接收三个参数

// const [state,formAction,isPending]= useActionstate(fn,initialstate，permalink?);
// 返回值
// state:当前的数据，正确数据和错误数据都在里面
// formAction:用于触发Action的函数，直接调用即可触发Actions
// isPending:是否正在执行Action

// 参数：
// fn:Action函数,一个异步函数,接收两个参数，第一个是上一个state的值，第二个是调用formAction传入的参数.这个函数的返回值会作为state的值
// initialstate:初始值，state的初始值
// permalink:是否永久链接，默认为false，如果为true，
import React, { memo, useActionState, useState, startTransition } from "react";
import axios from "axios";

function updateData(name) {
  return axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/posts",
    data: {
      title: name,
    },
  });
}

const App = memo(() => {
  const [name, setName] = useState("");

  // preState是上一个state的值,每次执行都会传入上一个state的值
  // name是调用formAction传入的参数
  const [state, formAction, isPending] = useActionState(
    async (preState, name) => {
      try {
        console.log("上一次的state值：", preState);
        const res = await updateData(name);
        return res.data.title;
      } catch (error) {
        return error.message;
      }
    },
    88888
  );

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      {/* formAction传入的参数，会作为useActionState第一个参数Action函数的第二个参数 */}
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            formAction(name);
          });
        }}
      >
        提交
      </button>
      {/* 当前的数据 */}
      <h1>{state}</h1>
    </div>
  );
});

export default App;
