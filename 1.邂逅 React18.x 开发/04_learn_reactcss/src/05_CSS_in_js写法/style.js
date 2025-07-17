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
// 1.基本使用
export const AppWrapper = styled.div`
  .footer {
    border: 1px solid orange;
  }
`;

// 2.子元素单独抽取到一个样式组件
// 3.可以接受外部传染的props参数
// 4.attrs:设置默认值，如果没有传入props参数，则使用默认值
export const SectionWrapper = styled.div.attrs({
  tColor: ((props) => props.color) || "blue",
})`
  border: 1px solid red;

  .title {
    color: ${(props) => props.tColor};
    /* 获取外部参数props.size */
    font-size: ${(props) => props.size}px;

    &:hover {
      background-color: purple;
    }
  }

  .content {
    color: green;
    font-size: 20px;
  }
`;
