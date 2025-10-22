import styled from "styled-components";

export const IconWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(${(props) => props.scale});
  box-sizing: border-box;
  .nav-container {
    width: 36px;
    height: 36px;
    display: block;
    box-sizing: border-box;
    transform: none;

    /* &:hover {
      transform: scale(1.1);
    } */

    /* 确保按下状态时过渡更快速 */
    &:active {
      transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      transform: scale(2);
    }
  }
`;
