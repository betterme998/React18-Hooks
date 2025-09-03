import React, { Component } from "react";
import { ThemeContext } from "./context/theme-context";
export class Profile extends Component {
  static contextType = ThemeContext;
  render() {
    console.log(this.context);

    return <div>Profile</div>;
  }
}

export default Profile;
