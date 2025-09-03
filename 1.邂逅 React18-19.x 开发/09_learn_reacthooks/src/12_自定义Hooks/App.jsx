// 通过key，直接从localStorage中获取数据
import React, { memo } from "react";
import { useLocalStorage } from "./hooks";

const App = memo(() => {
  // 设置token
  // const [token, setToken] = useState(localStorage.getItem("token"));
  // useEffect(() => {
  //   localStorage.setItem("token", token);
  // }, [token]);

  // hooks封装
  const [token, setToken] = useLocalStorage("token");
  function setTokenHandle() {
    setToken("james");
  }

  // 设置头像地址
  // const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl"));
  // useEffect(() => {
  //   localStorage.setItem("avatarUrl", avatarUrl);
  // }, [avatarUrl]);

  // hooks封装
  const [avatarUrl, setAvatarUrl] = useLocalStorage("avatarUrl");

  function setAvatarUrlHandle() {
    setAvatarUrl(
      "https://img.zcool.cn/community/0165485942aee20000019c1b7d3a8f.7pg01288w120 100sh.png"
    );
  }

  return (
    <div className="app">
      <h1>App Root Component: {token}</h1>
      <button onClick={setTokenHandle}>设置token</button>
      <h1>App Root Component: {avatarUrl}</h1>

      <button onClick={setAvatarUrlHandle}>设置新头像地址</button>
    </div>
  );
});

export default App;
