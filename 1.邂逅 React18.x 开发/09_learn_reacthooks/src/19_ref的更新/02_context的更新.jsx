// react19 context的更新
import React, { memo, createContext, useContext } from "react";

const ThemeContext = createContext("light");
const Child = memo(() => {
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
      <h2>当前主题{theme}</h2>
    </div>
  );
});

const App = memo(() => {
  return (
    // 这里不需要ThemeContext.Provider了
    <ThemeContext value="dark">
      <div>子组件</div>
      <Child />
    </ThemeContext>
  );
});

export default App;
