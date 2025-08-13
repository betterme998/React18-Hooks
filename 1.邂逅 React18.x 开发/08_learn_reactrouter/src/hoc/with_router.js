// 高阶组件：函数
// 为了让类组件使用函数组件的hooks功能，增强类组件
import { useNavigate } from "react-router";
function withRouter(WrapperComponent) {
  return function (props) {
    // 拿到hooks的返回函数，并传入组件中
    // 从而实现类组件使用hooks的功能
    const navigate = useNavigate();
    const router = { navigate };
    return <WrapperComponent {...props} router={router} />;
  };
}

export default withRouter;
