import styled from "styled-components";

export const NavWrapper = styled.div`
  width: 500px;
  margin: 22px auto 24px;
  opacity: 1;
  box-sizing: border-box;
  /* will-change 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。 */
  will-change: opacity;
  .ant-tabs-nav-list {
    width: 100%;
    overflow: visible;
    display: grid;
    gap: 35px;
    margin-top: 8px;
    grid-template-columns: repeat(3, min-content);
    justify-content: center;
    background-color: aqua;
    box-sizing: border-box;
    position: relative;

    .ant-tabs-tab {
      color: #6a6a6a;
      font-family: inherit;
      font-size: 0.875rem;
      .ant-tabs-tab-btn {
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      #rc-tabs-1-tab-1 .ant-tabs-tab-icon {
        margin-right: 16px;
      }
      #rc-tabs-1-tab-2 .ant-tabs-tab-icon {
        margin-right: 8px;
      }
    }
    .ant-tabs-tab-active {
      color: #222222;
    }
  }
`;
