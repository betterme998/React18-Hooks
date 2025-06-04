import React, { PureComponent } from "react";

export class App extends PureComponent {
  inputChange(e) {
    console.log("input change:", e);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={(e) => this.inputChange(e)} />
      </div>
    );
  }
}

export default App;
