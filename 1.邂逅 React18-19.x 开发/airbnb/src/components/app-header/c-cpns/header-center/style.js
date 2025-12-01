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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .NSCont {
      position: relative;
      /* background-color: red; */
    }
    .backCont {
      /* position: absolute; */
      left: 0;
      /* top: 0; */
      /* width: 100%;
      height: 96px;
      transform: scaleY(2.08); */
      /* background-color: red; */
    }
  }
`;
