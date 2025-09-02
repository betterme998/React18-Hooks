// form表单的action属性的加强
// form表单的action属性,在React19中支持传入一个回调函数来使用
// 传入一个Action函数

// 不需要定义受控组件了
// 数据都由from表单传递
// 不需要手动绑定事件了
import React, { memo, useActionState, useState } from "react";
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
  const [state, formAction, isPending] = useActionState(
    // formData是表单数据，提交表单传过来的
    async (preState, formData) => {
      try {
        console.log("上一次的state值：", preState);
        // 这里怎么拿到表单数据呢？
        // input的name要和formData.get("name1")对应起来，才能获取表单数据
        const res = await updateData(formData.get("name1"));
        return res.data.title;
      } catch (error) {
        return error.message;
      }
    },
    88888
  );

  return (
    <div>
      {/* react19支持action属性传入Action函数 */}
      <form action={formAction}>
        {/* 这里要添加name属性，为了获取表单数据 */}
        <input name="name1" type="text" />
        {/* 这里添加type="submit",为了提交表单 */}
        <button disabled={isPending} type="submit">
          提交
        </button>
      </form>

      {/* 当前的数据 */}
      <h1>{state}</h1>
    </div>
  );
});

export default App;
