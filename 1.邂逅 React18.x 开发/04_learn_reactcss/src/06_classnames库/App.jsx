import React, { PureComponent } from "react";
import classNames from "classnames";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isbbb: true,
      isccc: true,
    };
  }
  render() {
    // 如果都要这样添加class那么会很繁琐
    const { isbbb, isccc } = this.state;
    const classList = ["aaa"];
    if (isbbb) classList.push("bbb");
    if (isccc) classList.push("ccc");
    const classname = classList.join(" ");

    return (
      <div>
        <h2 className={`aaa ${isbbb ? "bbb" : ""} ${isccc ? "ccc" : ""}`}>
          哈哈哈
        </h2>
        <h2 className={classname}>哈哈哈</h2>
        {/* 第三方库动态添加class */}
        <h2 className={classNames("aaa", { bbb: isbbb, ccc: isccc })}>
          哈哈哈
        </h2>
        <h2 className={classNames(["aaa", { bbb: isbbb, ccc: isccc }])}>
          哈哈哈
        </h2>
      </div>
    );
  }
}

export default App;
