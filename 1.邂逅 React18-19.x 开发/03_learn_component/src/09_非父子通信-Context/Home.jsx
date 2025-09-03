import React, { Component } from "react";
import HomeInfo from "./HomeInfo";
import HomeBanner from "./HomeBanner";

export class Home extends Component {
  render() {
    const { name, age } = this.props;

    return (
      <div>
        <h2>
          Home: {name}-{age}
          <HomeInfo />
          <HomeBanner />
        </h2>
      </div>
    );
  }
}

export default Home;
