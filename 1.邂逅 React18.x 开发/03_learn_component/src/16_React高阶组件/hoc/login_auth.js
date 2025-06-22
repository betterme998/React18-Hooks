// 高阶组件：登录认证
function loginAuth(OriginComponent) {
  return (props) => {
    // 从LocalStorage中获取token
    const token = localStorage.getItem("token");
    if (token) {
      return <OriginComponent {...props} />;
    } else {
      return <h2>请先登录</h2>;
    }
  };
}

export default loginAuth;
