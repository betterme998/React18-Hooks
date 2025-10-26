import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  padding: 0 48px;
  position: relative;
  box-sizing: border-box;

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
