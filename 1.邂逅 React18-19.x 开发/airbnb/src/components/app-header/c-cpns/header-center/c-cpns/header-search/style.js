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
      grid-template-columns:
        minmax(0, 32.823%) minmax(0, 1fr)
        minmax(0, 32.823%);
      /* grid-template-columns: repeat(3, calc((100% - 4px) / 3)); */
      border: 1px solid #ddd;
      border-radius: 999px;
      box-shadow:
        rgba(0, 0, 0, 0.1) 0 8px 24px 0,
        rgba(0, 0, 0, 0.02) 0 0 0 1px;
      box-sizing: border-box;
      grid-auto-flow: column;
      gap: 4px;

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
        left: -3px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 32px;
        background: #ddd;
        z-index: 4; /* 保证在指示器之上 */
        pointer-events: none;
      }
      .ant-segmented-item:last-child::before {
        left: -2px;
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
      .ant-segmented-item.ant-segmented-item-selected {
        .ant-segmented-item-label::after {
          transform: scale(1);
          opacity: 1;
          box-shadow:
            rgba(0, 0, 0, 0.1) 0px 3px 12px 0px,
            rgba(0, 0, 0, 0.08) 0px 1px 2px 0px;
          transition: ${(props) =>
            props.$playedEntry ? "transform 0.4s ease" : "none"};
        }
        .ant-segmented-item-label
          .ant-segmented-item-Content
          .ant-options-shutDown {
          //选中关闭按钮
          display: flex;
        }
      }

      /* 新增：确保未选中滑块的文字也在背景之上 */
      .ant-segmented-item .ant-segmented-item-label {
        position: absolute;
        z-index: 3;
        overflow: visible;
        height: 66px;
        box-sizing: border-box;
        width: 100%;
        padding: 0;
        /* left: -1px;  */
        line-height: 66px;
        .ant-segmented-item-Content {
          position: absolute;
          height: 66px;
          box-sizing: border-box;
          padding: 15px 32px;
          width: 100%;
          z-index: 1;
          line-height: 66px;
          .ant-options-shutDown {
            display: none;
            position: absolute;
            right: 6px;
            align-items: center;
            top: 0px;
            box-sizing: border-box;
          }
          .ant-options-item-title {
            font-family: Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
            height: 18px;
            padding-bottom: 2px;
            line-height: 1rem;
            font-size: 0.75rem;
            font-weight: 500;
            text-align: left;
            /* left: -2px; */
            color: #222;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: clip;
            box-sizing: border-box;
          }
          .ant-options-input {
            height: 18px;
            box-sizing: border-box;
            line-height: 18px;
            .ant-options-item-input {
              height: 18px;
              font-size: 0.875rem;
              
              /* font-weight: 500; */
              color: #222;
              border: none;
              padding: 0;
              box-sizing: border-box;
              position: relative;
              top: -1px;
              margin: 0;
              text-overflow: ellipsis;
              letter-spacing: normal;
              white-space: nowrap;
              font-family: inherit;
              font-family: 'Airbnb Cereal VF';
              background: rgba(0, 0, 0, 0);
              /* pointer-events: none; */
              /* background-color: red; */
            }
            .ant-options-item-input::placeholder {
              color: #6a6a6a;
            }
            
          }
        }
        .ant-segmented-item-Content1{
        padding: 15px 24px;
        }
        .ant-segmented-item-Content2{
        padding:15px 96.968px 15px 24px;
        }
      }
      .ant-segmented-item:last-child .ant-segmented-item-label {
        right: -1px;
        /* left: 0; */
      }
      .ant-segmented-item .ant-segmented-item-label::after {
        content: "";
        top: 0;
        left: 0;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 999px;
        transform-origin: center;

        transform: scale(0.5);
        transition: none;
        border: 1px solid #ddd;
        z-index: -1;
        opacity: 0;
      }
    }
  }
  .ant-segmented:focus {
    outline: none;
  }
`;
