// 这个页面想使用store里面的数据，通过react-redux的connect方法来连接store，并通过mapStateToProps来映射state到props中
// connect将组件和redux store连接起来
import { connect } from "react-redux";

import React, { PureComponent } from "react";
import { addNumberAction } from "../store/actionCreators";

export class about extends PureComponent {
  calcNumber(num, isAdd) {
    if (isAdd) {
      console.log("add", num);
      // connect第一个参数接收两个参数，第一个参数是组件的props，第二个参数是dispatch方法，都会映射到props中
      this.props.addNumber(num);
    } else {
      console.log("sub", num);
      this.props.subNumber(-num);
    }
  }

  render() {
    // 注意：因为数据通过props传递，所以这里的this.props.counter就是从store中映射过来的数据
    const { counter, banners, recommends } = this.props;

    return (
      <div>
        <h2>About Page: {counter} </h2>
        {/* react-redux修改数据 */}
        <div>
          <button onClick={(e) => this.calcNumber(6, true)}>+6</button>
          <button onClick={(e) => this.calcNumber(88, true)}>+88</button>

          <button onClick={(e) => this.calcNumber(6, false)}>-6</button>
          <button onClick={(e) => this.calcNumber(88, false)}>-88</button>
        </div>
        <div className="banners">
          <h2>轮播图数据：</h2>
          <ul>
            {banners.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
        <div className="recommend">
          <h2>推荐数据：</h2>
          <ul>
            {recommends.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

// connect方法返回一个高阶组件
// connect方法接收两个参数，第一个参数是mapStateToProps函数，第二个参数是mapDispatchToProps函数
// 注意：connect方法的第一个参数是mapStateToProps函数，用于将redux store中的state映射到组件的props中
// 就是这个组件需要哪些数据，就通过这个参数来告诉connect方法

// function mapStateToProps(state) {
//   // 这个函数被调用会传入一个state参数，这个参数就是redux store中的state
//   // 根据这个state参数来返回一个对象，这个对象的属性会被映射到组件的props中
//   return {
//     counter: state.counter, // 将store中的counter属性映射到组件的props中
//   };
// }

// 第一个参数:接收一个state参数，返回一个对象，这个对象的属性会被映射到组件的props中

// 第二个参数：接收一个dispatch参数，返回一个对象，这个对象的属性会被映射到组件的props中
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNumber(num) {
//       dispatch(addNumberAction(num)); // 触发action，修改store中的数据
//     },
//     subNumber(num) {
//       dispatch(addNumberAction(num));
//     },
//   };
// };

const mapStateToProps = (state) => ({
  counter: state.counter,
  banners: state.banners,
  recommends: state.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber: (num) => dispatch(addNumberAction(num)),
  subNumber: (num) => dispatch(addNumberAction(num)),
});

// 会以props形式将fn1函数返回的对象传递给about组件
// 第一个小括号执行connect，第二个小括号执行connect返回的高阶组件，并传入about组件
export default connect(mapStateToProps, mapDispatchToProps)(about);

/*
总结：
connect是高阶函数：它接收另外两个函数作为参数，并且返回新函数，
返回的函数是：高阶组件，高阶组件接收一个组件作为参数

接收两个函数作用：
参数一：
*/
