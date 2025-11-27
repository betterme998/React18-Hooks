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
    box-shadow: 0 0.953955px 1.90791px rgba(60, 77, 107, 0.25),
      0 3.81582px 5.72373px rgba(60, 77, 107, 0.25), inset 0 0 2px 0.5px #001c40,
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

    .nav-dir-text {
      background-clip: text;
      top: -1px;
      font-weight: 700;
      font-size: 0.5rem;
      text-align: center;
      text-rendering: optimizeLegibility;
      letter-spacing: 0.04em;
      color: #fff;
      text-transform: uppercase;
      position: relative;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
`;
