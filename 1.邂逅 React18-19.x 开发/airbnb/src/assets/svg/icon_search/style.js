import styled from "styled-components";

export const IconSearchWarpper = styled.div`
  height: 100%;
  cursor: pointer;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
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
    transition: width 0.2s ease;
  }
  .icon-search-button-active {
    width: 80px;
  }

  .icon-search-container {
    display: flex;
    height: 48px;
    width: auto;
    gap: 8px;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    .active {
    }
  }
`;
