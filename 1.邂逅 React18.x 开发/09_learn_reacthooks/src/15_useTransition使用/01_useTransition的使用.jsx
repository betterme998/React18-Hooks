// 在输入框中输入字母，显示所有包含该字母的用户名
// 当数据特别多时，input输入框的输入会非常卡顿
// 输入框删除字母的更新，和下面列表的更新是一起的，更新一万条数据会出现卡顿
// 这个时候就可以用useTranstion来解决卡顿问题：让输入框立即响应，列表慢慢加载
// 让某些操作的优先级往后推一些
// 主要影响：计算密集型的操作
// 延迟的不是状态更新本身，而是由状态更新触发的重渲染过程
import React, { memo, useState, useTransition } from "react";
import namesArray from "./namesArray";

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray);
  // useTransition 两个返回值,pengding布尔值（悬而未决的状态），第二个是函数
  const [pending, startTransition] = useTransition();

  function valueChangeHandle(event) {
    // 传入一个回调函数
    startTransition(() => {
      // 优先级低的操作放到这个回调函数中
      // 会把我们主要更新完后，再更新函数内的操作
      const keyword = event.target.value;
      const filterShowNames = namesArray.filter((item) =>
        item.includes(keyword)
      );
      setShowNames(filterShowNames);
    });
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle} />
      {/* 当是悬而未决的状态时，显示加载中 */}
      <h2>用户名列表：{pending && <span>data loading</span>}</h2>
      <ul>
        {showNames.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
});

export default App;
