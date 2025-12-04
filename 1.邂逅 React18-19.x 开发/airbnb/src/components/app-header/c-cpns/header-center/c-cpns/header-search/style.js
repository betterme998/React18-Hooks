import styled from "styled-components";

export const SearchWarpper = styled.div`
  width: 850px;
  height: 66px;
  .ant-segmented {
    width: 100%;

    border-radius: 32px;
    height: 100%;
    align-items: center;
    .ant-segmented-group {
      height: 100%;
      align-items: center;
      display: grid;
      /* grid-template-columns: repeat(3, 33.33%); */
      grid-template-columns: 1fr 1fr 1fr;
      box-sizing: border-box;
      grid-auto-flow: column;
      gap: 2px;

      .ant-segmented-item {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
`;
