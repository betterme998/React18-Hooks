import styled from "styled-components";

export const IconWrapper = styled.div`
  .nav-container {
    width: 36px;
    height: 36px;
    display: block;
    box-sizing: border-box;
    transform: none;

    /* &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.8);
    } */

    .nav-video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      transform: scale(2);
    }
  }
`;
