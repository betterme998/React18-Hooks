import React from "react";
import ReactDOM from "react-dom/client";
// 设置主题样式
import { ThemeProvider } from "styled-components";
// import App from "./01_内联样式的CSS/App";
// import App from "./02_普通的CSS写法/App";
// import App from "./03_CSS_Modules/App";
// import App from "./04_Less编写方式/App";
import App from "./05_CSS_in_js写法/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 这是设置主题的一种方式，相当于父组件传入props，然后子组件接收后使用，但是要写在父组件内 */}
    {/* 在home组件中使用 */}
    <ThemeProvider theme={{ color: "red", size: "50px" }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
