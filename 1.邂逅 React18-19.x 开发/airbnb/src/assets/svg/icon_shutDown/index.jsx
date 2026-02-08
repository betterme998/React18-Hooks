import React, { memo } from "react";

import { IconShutDownWrapper } from "./style";
import { styleStrToObject } from "../utils";

const IconShutDown = memo(() => {
  return (
    <IconShutDownWrapper>
      <button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true" //是否对助读技术隐藏
            role="presentation" //告诉屏幕阅读器等辅助技术，这个 SVG 元素是纯装饰性的，不需要被识别为有意义的内容结构。
            focusable="false" //移除装饰性元素的焦点
            style={styleStrToObject(
              "display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 4; overflow: visible;",
            )}
          >
            <path d="m6 6 20 20M26 6 6 26"></path>
          </svg>
        </span>
      </button>
    </IconShutDownWrapper>
  );
});

export default IconShutDown;
