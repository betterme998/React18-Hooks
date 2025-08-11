import { PureComponent } from "react";
import { StoreContext } from "../hoc/StoreContext";
// 这里面引入store，耦合度太高了，我们再创建一个StoreContext.js文件，在里面封装store的订阅和取消订阅逻辑
// import store from "../store";

// 自定义connect函数，用于连接react和redux-toolkit的store
// connect的参数：
// 参数一：函数
// 参数二：函数
// 返回值：函数 => 高阶组件函数
export function connect(mapStateToProps, mapDispatchToProps) {
  // 高阶组件：函数，接收一个组件，返回一个新的组件
  return function (WrapperComponent) {
    class NewComponent extends PureComponent {
      // 类组件获取context值.
      static contextType = StoreContext;

      // 构造函数接收两个参数，一个是props，一个是context

      constructor(props, context) {
        super(props);
        // 初始化state值，通过mapStateToProps函数获得
        // 因为context传入了store，所以这里context就是store
        this.state = mapStateToProps(context.getState());
      }
      // 监听数据变化后重新调用render方法，从而实现组件的更新
      componentDidMount() {
        // 订阅store更新事件
        this.unsubscribe = this.context.subscribe(() => {
          // 当store更新时，重新调用setState方法，从而实现组件的更新
          this.setState(mapStateToProps(this.context.getState()));
        });
      }
      componentWillUnmount() {
        // 页面关闭时取消订阅
        this.unsubscribe();
      }
      render() {
        // 调用参数一，并传入store的state值
        const stateObj = mapStateToProps(this.context.getState());
        // 调用参数二，并传入store的dispatch方法
        const dispatchObj = mapDispatchToProps(this.context.dispatch);

        return (
          // 将stateObj和dispatchObj通过props传递给被包装的组件
          <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />
        );
      }
    }

    return NewComponent;
  };
}
