import React from "react";

class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Hello World",
    };
  }
  render() {
    return (
      <div>
        <h2>Hello World</h2>
        <p>Hello World,你好世界</p>
      </div>
    );
  }
}
export default HelloWorld;
