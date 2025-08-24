// 获取滚动位置
import React, { memo } from "react";
import "./style.css";
import { useScrollPosition } from "./hooks";

const Home = memo(() => {
  const [scrollX, scrollY] = useScrollPosition();

  return (
    <h1>
      Home Page: {scrollX}-{scrollY}
    </h1>
  );
});

const About = memo(() => {
  return <h1>About Page</h1>;
});

const App = memo(() => {
  return (
    <div className="app">
      <h1>App Root Component</h1>
      <Home />
      <About />
    </div>
  );
});

export default App;
