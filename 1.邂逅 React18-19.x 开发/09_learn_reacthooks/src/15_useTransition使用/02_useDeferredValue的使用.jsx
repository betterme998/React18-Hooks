// 在输入框中输入字母，显示所有包含该字母的用户名
// 当数据特别多时，input输入框的输入会非常卡顿
// 解决：useDeferredValue，延迟展示数据
import React, { memo, useState, useDeferredValue } from "react";
import namesArray from "./namesArray";

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray);
  // 我们不要直接展示showName
  // 我们展示延迟的数组
  const deferedShowNames = useDeferredValue(showNames);

  function valueChangeHandle(event) {
    const keyword = event.target.value;
    const filterShowNames = namesArray.filter((item) => item.includes(keyword));
    setShowNames(filterShowNames);
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle} />
      <h2>用户名列表：</h2>
      <ul>
        {/* 展示延迟数组 */}
        {deferedShowNames.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
});

export default App;
