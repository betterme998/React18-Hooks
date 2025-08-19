// 函数式组件使用hook拿到context数据
// 注意事项:
// 口 当组件上层最近的 <MyContext.Provider>更新时，该 Hook 会触发重新渲染，
// 并使用最新传递给 MyContext provider 的context value 值。
import React, { memo, useContext } from "react";
import { UserContext, ThemeContext } from "../05_useContext的使用/context";

const App = memo(() => {
  // 使用多个Context
  // useContext:接收一个Context对象，返回该Context的当前值
  // 当共享数据变化时，组件会重新渲染，拿到最新的数据
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h2>
        User: {user.name}-{user.level}
      </h2>
      <h2 style={{ color: theme.color, fontSize: theme.size }}>Theme</h2>
    </div>
  );
});

export default App;
