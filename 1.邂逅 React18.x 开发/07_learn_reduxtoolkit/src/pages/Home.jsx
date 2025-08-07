import React, { PureComponent } from "react";
import { connect } from "react-redux"

export class Home extends PureComponent {
  render() {
    return <div>Home</div>;
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter
})

export default Home;
