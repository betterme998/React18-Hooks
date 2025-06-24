import React, { PureComponent, Fragment } from "react";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      sections: [
        { id: 1, title: "Section 1", content: "Content for Section 1" },
        { id: 2, title: "Section 2", content: "Content for Section 2" },
        { id: 3, title: "Section 3", content: "Content for Section 3" },
      ],
    };
  }
  render() {
    const { sections } = this.state;
    return (
      // 必须要有根元素包裹，不然会报错，但是我们如果不想要这个元素怎么办呢？
      // 就可以用Fragment来包裹，类似与vue的<template>标签</template>
      // Fragment语法糖写法：<></>，但是兼容性不好，所以不推荐使用。

      <Fragment>
        <h2>我是App的标题</h2>
        <p>我是App的内容，哈哈哈</p>
        <hr />

        {sections.map((item) => {
          return (
            // 遍历渲染数组时需要根元素包裹，否则会报错
            // 可以使用Fragment包裹.
            // 这里不能用Fragment语法糖
            <Fragment>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default App;
