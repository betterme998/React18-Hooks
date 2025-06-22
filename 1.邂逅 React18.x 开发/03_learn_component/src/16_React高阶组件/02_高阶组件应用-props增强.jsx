import React, { PureComponent } from "react";
import enhancedUserInfo from "./hoc/enhanced_props";
import Abouts from "./pages/Abouts";

// 使用高阶组件来增强Home组件
const Home = enhancedUserInfo(function (props) {
  return (
    <div>
      <h1>
        Home: {props.name} - {props.age}
      </h1>
      {/* 组件本身传入的数据 */}
      <ul>
        {props.banners.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
});

const Profile = enhancedUserInfo(function (props) {
  return <h1>Profile</h1>;
});

const HelloFriend = enhancedUserInfo(function (props) {
  return (
    <h1>
      HelloFriend: {props.name} - {props.age}
    </h1>
  );
});

export class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 本身有传数据 */}
        <Home banners={["轮播图1", "轮播图2"]} />
        <Profile />
        <HelloFriend />
        <Abouts />
      </div>
    );
  }
}

export default App;
