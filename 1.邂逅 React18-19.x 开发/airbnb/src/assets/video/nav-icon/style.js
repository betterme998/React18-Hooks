import styled from "styled-components";

export const IconWrapper = styled.div`
  display: inline-block;
  cursor: pointer;

  .nav-container {
    width: 36px;
    height: 36px;
    display: block;
    box-sizing: border-box;
    transform: none;
    .nav-video,
    .nav-canvas {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      transform: scale(2);
    }
  }
  .nav-dir {
    position: absolute;
    display: inline-block;
    box-sizing: border-box;
    top: -10px;
    line-height: 0.715rem;

    left: 100%;
    padding: 3px 6px;
    font-size: 0.5rem;
    box-shadow:
      0 0.953955px 1.90791px rgba(60, 77, 107, 0.25),
      0 3.81582px 5.72373px rgba(60, 77, 107, 0.25),
      inset 0 0 2px 0.5px #001c40,
      inset 0 -1px 3px #d7ebff;
    background: linear-gradient(
      357.5deg,
      #3e567c 1.59%,
      #3a5475 21.23%,
      #2d3c5b 58.6%,
      #809dc0 97.4%
    );
    border-radius: 10px 10px 10px 2px;
    transform-origin: bottom left;
    user-select: none;
    cursor: pointer;
    font-family: inherit;

    /* 提示浏览器创建独立合成层，通常能避免模糊 */
    will-change: transform, opacity;
    transform: translateZ(0); /* 或 translate3d(0,0,0) */
    backface-visibility: hidden;

    /* 字体渲染调整 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    .nav-dir-text {
      background-clip: text;
      top: -1px;
      font-weight: 700;
      font-size: 8px;
      text-align: center;
      text-rendering: optimizeLegibility;
      letter-spacing: 0.04em;
      color: #fff;
      text-transform: uppercase;
      position: relative;
      box-sizing: border-box;
      cursor: pointer;

      /* 小额调整可提高清晰度 */
      display: inline-block;
      transform: translateZ(0);
    }
  }
`;
