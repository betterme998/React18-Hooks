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
      grid-template-columns: repeat(3, minmax(0, 1fr));

      box-sizing: border-box;
      grid-auto-flow: column;
      gap: 2px;

      /* 在滑块被选中中时，隐藏选中滑块左右两边的分割线：思路：选中的上一个滑块隐藏分割线，选中的滑块隐藏分割线 */
      //选中上一个滑块，和选中的滑块
      .ant-segmented-item:has(+ .ant-segmented-item-selected)::before,
      .ant-segmented-item-selected.ant-segmented-item::before {
        opacity: 0;
      }
      /* 当任意非选中项被 hover 时，整组的所有分隔线都隐藏（需要浏览器支持 :has） */
      &:has(.ant-segmented-item:not(.ant-segmented-item-selected):hover) {
        .ant-segmented-item:not(:last-child)::before {
          opacity: 0;
        }
      }
      /* 兼容：若浏览器不支持 :has，仍至少隐藏当前 hover 的那条分隔线 */
      .ant-segmented-item:not(.ant-segmented-item-selected):hover::before {
        opacity: 0;
      }

      .ant-segmented-item {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      /* 设置滑块分割线 */
      .ant-segmented-item:not(:last-child)::before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        /* margin: 0 1px; */
        height: 32px;
        background: #ddd;

        z-index: -2; //保证在指示器之上
        pointer-events: none;
      }
      /* 将指示器放在分割线下方，避免动画时分割线错位或被覆盖 */
      .ant-segmented-indicator {
        z-index: 0;
      }
    }
  }
`;
