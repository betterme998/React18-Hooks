// 每个组件在创建的时候打印，销毁的时候打印
import React, { memo, useEffect, useState } from "react";

function useLogLife(cName) {
  // 自定义hooks，必须以use开头命名
  useEffect(() => {
    console.log(cName + "组件被创建");
    return () => {
      console.log(cName + "组件被销毁");
    };
  }, []);
}

const Home = memo(() => {
  useLogLife("home");
  return <h1>Home Page</h1>;
});

const About = memo(() => {
  useLogLife("about");

  return <h1>About Page</h1>;
});

const App = memo(() => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div>
      <h1>App Root Component</h1>
      <button onClick={(e) => setIsShow(!isShow)}>切换</button>
      {isShow && <Home />}
      {isShow && <About />}
    </div>
  );
});

export default App;
