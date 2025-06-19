import React, { PureComponent } from "react";

/*
■ 那么说明是高阶组件呢?
口 高阶组件的英文是 Higher-Order Components，简称为 HOC
口 官方的定义:高阶组件是参数为组件，返回值为新组件的函数

注：1.高阶组件本身不是一个组件，而是一个函数;
特点：*接受一个组件作为它的参数。 *返回一个新组件
*/
// 定义一个高阶组件,*接受一个组件作为它的参数
function hoc(WrapperComponent) {
  // 1.定义类组件
  class NewCpn extends PureComponent {
    // 这相当于给HelloWorld组件做了一层拦截，可以添加一些逻辑，属性等
    render() {
      return <WrapperComponent name="hoc" />;
    }
  }
  return NewCpn;

  // 2.定义函数组件
  // function NewCpn2(props) {}
  // return NewCpn2;
}

class HelloWorld extends PureComponent {
  render() {
    return <div>HelloWorld</div>;
  }
}
const HelloWorldHoc = hoc(HelloWorld);

export class App extends PureComponent {
  render() {
    return (
      <div>
        <HelloWorldHoc />
      </div>
    );
  }
}

export default App;
