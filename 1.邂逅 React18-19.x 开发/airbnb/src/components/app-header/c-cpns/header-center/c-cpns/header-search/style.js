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
      /* grid-template-columns: repeat(3, minmax(0, 1fr)); */
      grid-template-columns: repeat(3, calc((100% - 4px) / 3));

      box-sizing: border-box;
      grid-auto-flow: column;
      gap: 2px;

      /* ------------------------------------------------------------- */
      .ant-segmented-item {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      .ant-segmented-item::after {
        transition:
          opacity 0.2s,
          width 0.2s;
      }

      /* 设置滑块分割线 */
      .ant-segmented-item:not(:first-child)::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 32px;
        background: #ddd;
        z-index: 4; /* 保证在指示器之上 */
        pointer-events: none;
      }
      /* 隐藏第一个项的左侧分割线 */
      .ant-segmented-item:first-of-type::before {
        opacity: 0;
      }
      /* 鼠标移入时：隐藏当前项左侧分隔线（即与上一个的边界），并隐藏与下一个的分界线（通过选中下一个的 left ::before） */
      .ant-segmented-item:hover::before,
      .ant-segmented-item:hover + .ant-segmented-item::before {
        opacity: 0;
      }
      &:has(.ant-segmented-indicator[style*="translate"]) {
        .ant-segmented-item::before {
          opacity: 0;
        }
      }

      /*  */
      .ant-segmented-item-selected::before,
      .ant-segmented-item-selected + .ant-segmented-item::before {
        opacity: 0;
      }

      /* 当滑动的时候隐藏所有分割线 */
      .ant-segmented-thumb ~ .ant-segmented-item::before {
        opacity: 0;
      }

      /* 将指示器放在分割线下方，避免动画时分割线错位或被覆盖 */
      .ant-segmented-indicator {
        z-index: 5;
      }

      /* ------------------------------------------------------------- */
      /* 鼠标移入背景
        思路：设置选中滑块上一块和下一下after宽度100%+70px。下一块额外向右偏移70px，再调整z-index
      */
      /* 选中项下方的背景层（用于和 hover 的未选中项颜色保持一致）*/

      /* 选中滑块上一个滑块 */
      .ant-segmented-item:has(+ .ant-segmented-item-selected)::after {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        background: #ddd;
        z-index: 0;
        width: calc(100% + 70px);
      }
      /* 选中滑块下一个滑块 */
      .ant-segmented-item-selected {
        & + .ant-segmented-item::after {
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          left: -70px;
          width: calc(100% + 70px);
          z-index: 0;

          background: #ddd;
        }
      }
      .ant-segmented-item-selected {
        z-index: 2;
        background: none;
      }
      /* 新增：确保选中滑块的文字在背景之上 */
      .ant-segmented-item-selected .ant-segmented-item-label {
        z-index: 3;
      }
      .ant-segmented-item.ant-segmented-item-selected
        .ant-segmented-item-label::after {
        transform: scale(1);
        transition: ${(props) =>
          props.playedEntry ? "transform 200ms ease" : "none"};
      }

      /* 新增：确保未选中滑块的文字也在背景之上 */
      .ant-segmented-item .ant-segmented-item-label {
        z-index: 3;
      }
      .ant-segmented-item .ant-segmented-item-label::after {
        content: "";
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 999px;
        transform-origin: center;
        transform: scale(0);
        transition: none;
        z-index: -1;
        opacity: 1;
      }
    }
  }
  .ant-segmented:focus {
    outline: none;
  }
`;
