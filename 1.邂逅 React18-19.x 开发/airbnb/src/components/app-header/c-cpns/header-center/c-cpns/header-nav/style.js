import styled from "styled-components";

export const NavWrapper = styled.div`
  width: 500px;
  margin: 22px auto 24px;
  opacity: 1;
  box-sizing: border-box;
  /* will-change 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。 */
  will-change: opacity;
  overflow: visible;
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs {
    .ant-tabs-nav-wrap {
      overflow: visible;
    }
  }
  .ant-tabs-nav-list {
    width: 100%;
    overflow: visible;
    display: grid;
    gap: 35px;
    margin-top: 8px;
    grid-template-columns: repeat(3, min-content);
    justify-content: center;
    box-sizing: border-box;
    position: relative;

    > div:first-child {
      padding-left: 5px;
      margin-left: -5px;
    }
    > div:nth-child(3) {
      padding-left: 2px;
      margin-left: -2px;
    }

    .ant-tabs-tab {
      color: #6a6a6a;
      font-family: inherit;
      font-size: 0.875rem;
      box-sizing: border-box;
      .ant-tabs-tab-btn {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 36px;
        .nav-tab-item {
          display: flex;
          align-items: center;
          height: 36px;
          margin-inline-end: 0;
          line-height: 36px;
          /* 阻止文字被选中 */
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .nav-tab-label-text {
          /* 阻止文字被选中 */
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .nav-tab-label-text-1 {
          margin-left: 16px !important;
        }
        .nav-tab-label-text-2 {
          margin-left: 8px !important;
        }
        .nav-tab-label-text-3 {
          margin-left: 12px !important;
        }
      }
    }
    .ant-tabs-tab-active {
      color: #222222;
      font-weight: 600;
      text-shadow: none;
      .ant-tabs-tab-btn {
        text-shadow: none;
      }
    }
    .ant-tabs-ink-bar {
      height: 3px;
    }
  }
`;

export const NavIconWrapper = styled.div`
  position: relative;
  padding-bottom: 20px;
  padding-left: 18px;
  margin-left: -18px;
  bottom: -10px;

  /* 只对图标容器做缩放/合成，尽量不要把文字包含进同一层 */
  .nav-icon-wrapper {
    will-change: transform; /* 提示浏览器只优化 transform */
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0); /* 强制创建合成层，避免 layout repaint */
    transform-origin: center center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(${(props) => props.scale || 1});
  }

  /* 把文字也放到独立合成层并开启字体平滑，避免被图标缩放时受影响 */
  .nav-tab-label-text {
    will-change: transform, opacity;
    transform: translateZ(0); /* 单独合成层，避免与图标合成到同一层 */
    -webkit-font-smoothing: antialiased; /* 字体平滑 */
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: color 0.12s ease, opacity 0.12s ease;
  }
`;
