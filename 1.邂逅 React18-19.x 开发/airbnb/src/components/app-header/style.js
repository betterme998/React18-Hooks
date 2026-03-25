import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  box-sizing: border-box;
  padding: 0 48px;
  position: sticky;
  z-index: 100;
  width: 100%;
  top: 0px;

  @media (min-width: 375px) {
    padding: 0 24px;
  }
  @media (min-width: 744px) {
    padding: 0 24px;
  }
  @media (min-width: 950px) {
    padding: 0 32px;
  }
  @media (min-width: 1440px) {
    padding: 0 48px;
  }
`;
