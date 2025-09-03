// 高阶组件：函数
// 为了让类组件使用函数组件的hooks功能，增强类组件
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
function withRouter(WrapperComponent) {
  return function (props) {
    // 拿到hooks的返回函数，并传入组件中
    // 从而实现类组件使用hooks的功能
    // 1.手动路由跳转:导航
    const navigate = useNavigate();

    // 2.拿到路由参数：动态路由的参数：/detail/:id
    const params = useParams();

    // 3.查询字符串的参数：/user?name=why&age=18
    // 3.1:方法一
    const location = useLocation();

    // 3.2：方法二:返回的是一个数组，第一个是查询字符串的参数对象，第二个是设置查询字符串的函数
    // 解构写法:拿到第一个参数，可以通过get方法拿到对应的参数：searchParams.get("name")
    const [searchParams] = useSearchParams();
    // 把searchParams转化普通对象，方便使用
    // Object.fromEntries:把键值对列表转化成对象
    const query = Object.fromEntries(searchParams);

    const router = { navigate, params, location, query };
    return <WrapperComponent {...props} router={router} />;
  };
}

export default withRouter;
