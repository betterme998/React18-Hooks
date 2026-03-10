import styled from "styled-components";

export const HeaderLittleSearchWarpper = styled.div`
  display: flex;
  position: absolute;
  box-sizing: border-box;
  max-width: 100%;
  gap: 16px;
  left: 50%;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  .LittleSearchCont {
    border-radius: 40px;
    align-items: center;
    cursor: pointer;
    color: #222222;
    max-width: 100%;
    display: inline-flex;
    position: relative;
    box-sizing: border-box;
    transition: box-shadow 0.175s cubic-bezier(0.2, 0, 0, 1);
    .LittleSpan {
      padding: 0;
      border: 0;
      width: 1px;
      white-space: nowrap;
      overflow: clip;
      height: 1px;
      clip-path: inset(100%);
      position: absolute;
      box-sizing: border-box;
    }
    .LittleBoder {
      border-radius: 40px;
      box-shadow:
        rgba(0, 0, 0, 0.08) 0px 1px 2px,
        rgba(0, 0, 0, 0.05) 0px 4px 12px;
      transform-origin: 50% 0px 0px;
      transform: none;
      border: 1px solid #ddd;
      background: #fff;
      left: 0;
      z-index: -1;
      height: 100%;
      width: 100%;
      top: 0;
      position: absolute;
      box-sizing: border-box;
      color: #222222;
      pointer-events: none;
    }
    .LittleItem {
      opacity: 1;
      transform: none;
      grid-template-columns:
        minmax(0, min-content) 1px minmax(0, min-content)
        1px minmax(0, min-content);
      align-items: center;
      display: inline-grid;
      max-width: 100%;
      box-sizing: border-box;
      .LittleButton {
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
        margin: -1px;
        border: 1px solid transparent;
        border-radius: 4px;
        text-align: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        background: transparent;
        align-items: center;
        padding: 0;
        font-family: inherit;
        cursor: pointer;
        height: 48px;
        overflow: visible;
        min-width: 0;
        z-index: 1;
        color: inherit;
        appearance: none; //重置表单控件的默认样式
        display: flex;
        outline: none; //取消元素轮廓线的样式
        text-decoration: none; //无下划线
        position: relative;
      }
    }
  }
`;
