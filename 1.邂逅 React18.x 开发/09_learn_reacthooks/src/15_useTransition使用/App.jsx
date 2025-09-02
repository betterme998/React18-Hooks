// Actions 介绍
// 使用异步过度的函数被称为Actions
import React, { memo, useState, useTransition } from "react";
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
  const [isPending, starTransition] = useTransition();
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    // react19：useTransition可以接收异步函数作为参数
    starTransition(async () => {
      // 这个异步函数就是Actions
      try {
        const res = await updateData(name);
        console.log(res.data.title);
      } catch (error) {
        setError(error.message);
      }
    });
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      {/* 当是悬而未决的状态时，不能一直请求 */}
      <button onClick={handleSubmit} disabled={isPending}>
        提交
      </button>
      <h1>{name}</h1>
    </div>
  );
});

export default App;
