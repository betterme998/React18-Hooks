import styled from "styled-components";

export const CenterWrapper = styled.div`
  z-index: 0;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  padding: 0 48px;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
