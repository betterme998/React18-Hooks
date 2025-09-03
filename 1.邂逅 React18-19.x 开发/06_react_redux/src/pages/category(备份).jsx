// 这个页面用来请求数据，并保存到store中，请求到的数据在其他页面展示
import React, { PureComponent } from "react";
import axios from "axios";

import {
  changeBannersAction,
  changeRecommendsAction,
} from "../store/actionCreators";

// 使用connect高阶组件连接store
import { connect } from "react-redux";

export class category extends PureComponent {
  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 拿到数据后，派发action保存到store中

      this.props.changeBanners(banners);
      this.props.changeRecommend(recommends);
    });
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
  changeBanners(banners) {
    dispatch(changeBannersAction(banners));
  },
  changeRecommend(recommends) {
    dispatch(changeRecommendsAction(recommends));
  },
});

// connect会将dispatch以props的形式传入category组件中
// 我们就可以在category组件中使用dispatch派发action了

export default connect(null, mapDispatchToProps)(category);
