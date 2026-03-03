import styled from "styled-components";

export const IconSearchWarpper = styled.div`
  height: 100%;
  cursor: pointer;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    text-align: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 0;
    margin: 0;
    padding: 0;
    pointer-events: all; //捕获事件不会穿透下去
    cursor: pointer;
    /* background: linear-gradient(
      to right,
      #e61e4d 0%,
      #e31c5f 50%,
      #d70466 100%
    ); */
  }
  .icon-search-button-active {
    width: 80px;
    border-radius: 24px;
  }

  .icon-search-container {
    display: flex;
    height: 48px;
    width: 48px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    color: #fff;
    transform: none;
    background-color: #e00b41;
    padding: 10px;
    box-sizing: border-box;
    /* transform-origin: right; */
    overflow: hidden;
    transition:
      width 0.2s ease,
      gap 0.2s ease;
    will-change: width;

    .icon-search-text {
      /* visibility: hidden; */
      display: none;
      width: 0;
      transition:
        opacity 0.2s ease,
        width 0.2s ease;
    }
    .active {
    }
  }
  .icon-search-container-active {
    gap: 8px;
    border-radius: 24px;
    width: 80px;

    .icon-search-text-active {
      /* visibility: visible; */
      display: block;
      width: auto;
    }
  }
`;
