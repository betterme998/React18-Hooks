import styled from "styled-components";

export const SearchWarpper = styled.div`
  font-size: 16px;
  --nav-item-width: 9rem; /* 导航项宽度 */
  --nav-item-height: 2rem; /* 导航项高度 */
  --nav-item-padding: 1rem; /* 导航内边距 */
  --transition-speed: 0.5s; /* 过渡动画速度 */
  --active-index: ${(props) =>
    props.$activeIndex || 0}; //使用props传递的activeIndex
  /* 定义CSS变量，便于统一管理和维护 */

  max-width: 850px;
  background-color: var(--palette-white);
  border-radius: 32px;
  opacity: 1;
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  .ant-radio-group {
    width: 100%;
    height: 100%;
    display: grid;
    box-sizing: border-box;
    position: relative;
    border-radius: 32px;
    background: transparent; //透明背景
    align-items: center;
    gap: 2px;
    grid-template-columns: minmax(0, 2fr) 1px minmax(0, 1fr) 1px minmax(0, 1fr) 1px minmax(
        0,
        2fr
      );
    border: 1px solid #e2e8f0;
    table {
      border: none;
    }
  }
  .ant-radio-group::after {
    content: "";
    display: block;
    width: calc(var(--nav-item-width) - var(--nav-item-padding)); /* 计算宽度 */
    height: calc(
      var(--nav-item-height) + var(--nav-item-padding)
    ); /* 计算高度 */
    background: #e2e8f0; /* 背景色与页面背景一致 */
    position: absolute;
    top: 0;
    left: 0;
    margin: calc(var(--nav-item-padding) / 2); /* 外边距 */
    border-radius: var(--nav-item-height); /* 圆角 */
    transition: var(--transition-speed) all ease-in-out; /* 过渡动画 */
    transform: translateX(
      calc(var(--nav-item-width) * var(--active-index))
    ); //动态计算位置
  }

  /* 导航栏容器样式 */
  nav {
    background-color: #fff; /* 白色背景 */
    padding: var(--nav-item-padding) 0; /* 上下内边距 */
    border-radius: var(--nav-item-height); /* 圆角边框 */
    position: relative; /* 相对定位，为伪元素定位参考 */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }

  /* 导航栏滑动指示器（伪元素） */
  nav::after {
    content: "";
    display: block;
    width: calc(var(--nav-item-width) - var(--nav-item-padding)); /* 计算宽度 */
    height: calc(
      var(--nav-item-height) + var(--nav-item-padding)
    ); /* 计算高度 */
    background: #e2e8f0; /* 背景色与页面背景一致 */
    position: absolute;
    top: 0;
    left: 0;
    margin: calc(var(--nav-item-padding) / 2); /* 外边距 */
    border-radius: var(--nav-item-height); /* 圆角 */
    transition: var(--transition-speed) all ease-in-out; /* 过渡动画 */
    transform: translateX(
      calc(var(--nav-item-width) * var(--active-index))
    ); //动态计算位置
  }

  /* 导航列表样式 */
  nav ul {
    list-style: none; /* 移除列表样式 */
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    height: var(--nav-item-height);
    position: relative;
    z-index: 10; /* 确保在指示器上方 */
  }

  /* 导航项样式 */
  nav ul li {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    width: var(--nav-item-width); /* 固定宽度 */
    text-align: center; /* 文字居中 */
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--nav-item-width) - var(--nav-item-padding)); /* 计算宽度 */
    height: calc(
      var(--nav-item-height) + var(--nav-item-padding)
    ); /* 计算高度 */
    cursor: pointer;
  }

  /* 首页选中时的指示器位置 */
  #nav-home:checked ~ nav::after {
    transform: translatex(0);
  }

  /* 产品页选中时的指示器位置 */
  #nav-products:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 1));
  }

  /* 关于页选中时的指示器位置 */
  #nav-about:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 2));
  }

  /* 联系页选中时的指示器位置 */
  #nav-contact:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 3));
  }

  /* 隐藏单选框 */
  input[type="radio"] {
    /* display: none; */
  }

  /* 首页选中时的指示器位置 */
  .ant-radio-input:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 1));
  }

  /* 产品页选中时的指示器位置 */
  .ant-radio-input:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 1));
  }

  /* 关于页选中时的指示器位置 */
  .ant-radio-input:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 2));
  }

  /* 联系页选中时的指示器位置 */
  .ant-radio-input:checked ~ nav::after {
    transform: translatex(calc(var(--nav-item-width) * 3));
  }
`;
