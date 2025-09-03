// 使用 React.memo 优化函数组件渲染
import { memo } from "react";
const Profile = memo(function Profile(props) {
  console.log("Profile render");
  return <h2>Profile: {props.message}</h2>;
});

export default Profile;
