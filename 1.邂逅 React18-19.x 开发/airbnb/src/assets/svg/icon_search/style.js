import styled from "styled-components";

export const IconSearchWarpper = styled.div`
  height: 100%;
  cursor: pointer;
  button {
    display: flex;
    justify-content: center;
    border-radius: ${(props) => (props.radius ? `${props.radius}px` : "50px")};
    text-align: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 0;
    margin: 0;
    padding: 0;
    pointer-events: all; //捕获事件不会穿透下去
    cursor: pointer;
  }
  .icon-search-button-active {
    width: 80px;
    /* border-radius: 24px; */
  }

  .icon-search-container {
    display: flex;
    position: absolute; //关键代码：这里定位后会防止元素脱离正常文档流，否则会出现抖动错乱
    right: 10px;
    height: ${(props) => (props.width ? `${props.width}px` : "48px")};
    width: ${(props) => (props.width ? `${props.width}px` : "48px")};
    border-radius: ${(props) => (props.radius ? `${props.radius}px` : "50px")};
    justify-content: center; /*折叠式居中 */
    align-items: center;
    color: #fff;
    background: #e00b41;
    padding: 10px;
    box-sizing: border-box;
    transform-origin: right; /* 右边锚点 */
    overflow: hidden;
    transition:
      width 0.2s ease,
      gap 0.2s ease;
    will-change: width;

    /* 平滑移动图标：不依赖布局重流，用 transform */
    & > div:first-child {
      transition: transform 0.2s ease;
      transform: translateX(0);
      display: flex; /* 保证 svg 居中 */
      align-items: center;
      justify-content: center;
    }

    /* 确保文字一直在流中但不可见（避免 display:none 导致的重排） */
    .icon-search-text {
      overflow: hidden;
      opacity: 0;
      max-width: 0;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      transition:
        max-width 0.2s ease,
        opacity 0.01s ease;
    }
  }
  .icon-search-container-active {
    gap: 8px;
    width: 80px;
    background: linear-gradient(
      to right,
      #e61e4d 0%,
      #e31c5f 50%,
      #d70466 100%
    );
    justify-content: flex-start; /* 视觉上把图标靠左，不然会出现左右抖动 */

    /* 先平滑移动图标，让它占据左侧位置，不受随后文字出现的影响 */
    & > div:first-child {
      transform: translateX(3px);
    }
    .icon-search-text-active {
      overflow: visible;
      opacity: 1;
      max-width: 36px;
      transition-delay: 0.3s; //延迟出现
    }
  }
`;
