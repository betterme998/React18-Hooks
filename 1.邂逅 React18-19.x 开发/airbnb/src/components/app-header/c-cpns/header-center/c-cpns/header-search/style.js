import styled from "styled-components";

export const SearchWarpper = styled.div`
  width: 850px;
  height: 66px;
  .ant-segmented {
    border-radius: 32px;
    height: 100%;
    align-items: center;
    .ant-segmented-group {
      height: 100%;
      align-items: center;
      display: grid;
      gap: 2px;
      align-items: center;

      .ant-segmented-item {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
`;
