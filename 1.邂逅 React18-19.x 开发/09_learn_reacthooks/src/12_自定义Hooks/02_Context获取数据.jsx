// Context共享
import React, { memo } from "react";
import { useUserToken } from "./hooks/index";

// User/Token,用户信息，令牌信息
// 可能很多页面都需要用到

const Home = memo(() => {
  const [user, token] = useUserToken();

  return (
    <h1>
      Home Page: {user.name}-{token}
    </h1>
  );
});

const About = memo(() => {
  return <h1>About Page</h1>;
});

const App = memo(() => {
  return (
    <div>
      <h1>App Root Component</h1>
      <Home />
      <About />
    </div>
  );
});

export default App;
