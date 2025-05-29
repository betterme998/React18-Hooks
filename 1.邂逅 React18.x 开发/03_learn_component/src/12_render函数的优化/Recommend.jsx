import React, { Component } from "react";

export class Recommend extends Component {
  // shouldComponentUpdate(newProps) {
  //   if (this.props.counter !== newProps.counter) {
  //     return true; // 需要重新渲染
  //   }
  //   return false; // 不需要重新渲染
  // }
  render() {
    console.log("Recommend render");

    return (
      <div>
        <h2>Recommend Page: {this.props.counter}</h2>
      </div>
    );
  }
}

export default Recommend;
