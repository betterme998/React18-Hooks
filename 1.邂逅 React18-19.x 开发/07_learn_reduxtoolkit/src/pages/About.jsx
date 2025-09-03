import React, { PureComponent } from "react";
import { addNumber } from "../store/features/counter";
// import { connect } from 'react-redux'

/*
如果不想使用react-redux将react和redux结合使用。就自己封装一个connect
1.创建hoc文件夹
*/
import { connect } from "../hoc";

export class About extends PureComponent {
  render() {
    const { counter } = this.props;

    return (
      <div>
        <h2> About Counter: {counter}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumber(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
