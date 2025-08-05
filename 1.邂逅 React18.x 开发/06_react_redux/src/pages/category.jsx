// 这个页面用来请求数据，并保存到store中，请求到的数据在其他页面展示
import React, { PureComponent } from "react";

import { fetchHomeMultidataAction } from "../store/actionCreators";

// 使用connect高阶组件连接store
import { connect } from "react-redux";

export class category extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata();
  }
  render() {
    return (
      <div>
        <h2>Category Page</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchHomeMultidata() {
    dispatch(fetchHomeMultidataAction());
  },
});

// connect会将dispatch以props的形式传入category组件中
// 我们就可以在category组件中使用dispatch派发action了

export default connect(null, mapDispatchToProps)(category);
