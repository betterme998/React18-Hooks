import { PureComponent } from "react";
import store from "../store";
// 自定义connect函数，用于连接react和redux-toolkit的store
// connect的参数：
// 参数一：函数
// 参数二：函数
// 返回值：函数 => 高阶组件函数
export default function connect(mapStateToProps, mapDispatchToProps) {
  // 高阶组件：函数，接收一个组件，返回一个新的组件
  return function (WrapperComponent) {
    class NewComponent extends PureComponent {
      constructor(props) {
        super(props);
        // 初始化state值，通过mapStateToProps函数获得
        this.state = mapStateToProps(store.getState());
      }
      // 监听数据变化后重新调用render方法，从而实现组件的更新
      componentDidMount() {
        // 订阅store更新事件
        this.unsubscribe = store.subscribe(() => {
          // 当store更新时，重新调用setState方法，从而实现组件的更新
          this.setState(mapStateToProps(store.getState()));
        });
      }
      componentWillUnmount() {
        // 页面关闭时取消订阅
        this.unsubscribe();
      }
      render() {
        // 调用参数一，并传入store的state值
        const stateObj = mapStateToProps(store.getState());
        // 调用参数二，并传入store的dispatch方法
        const dispatchObj = mapDispatchToProps(store.dispatch);

        return (
          // 将stateObj和dispatchObj通过props传递给被包装的组件
          <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />
        );
      }
    }

    return NewComponent;
  };
}
