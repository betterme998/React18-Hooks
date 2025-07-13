/*
回顾：标签模板字符串
function foo(...args) {
  console.log(args);
}
//可以通过``来调用函数，并且会将``中的内容作为参数传递给foo函数。
 
foo`hello world`; // ["hello world"]

*/

// 导入第三方库styled-components来编写CSS样式
import styled from "styled-components";

// styled.div``返回一个组件,div
// 可以针对这个组件所有子元素进行样式编写

export const AppWrapper = styled.div`
  .section {
    border: 1px solid red;
  }

  .footer {
    border: 1px solid orange;
  }
`;
