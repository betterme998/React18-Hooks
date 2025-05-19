import React, { Component } from "react";
import HomeInfo from "./HomeInfo";

export class Home extends Component {
  render() {
    const { name, age } = this.props;

    return (
      <div>
        <h2>
          Home: {name}-{age}
          <HomeInfo />
        </h2>
      </div>
    );
  }
}

export default Home;
