import React, { memo } from "react";
import { IconSearchWarpper } from "./style";
import { styleStrToObject } from "../utils";
import { Button } from "antd";

const IconSearch = memo(() => {
  return (
    <IconSearchWarpper>
      <button>
        <div>
          <div>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={styleStrToObject(
                "display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;",
              )}
            >
              <path d="m20.666 20.666 10 10"></path>
              <path
                d="m24.0002 12.6668c0 6.2593-5.0741 11.3334-11.3334 11.3334-6.2592 0-11.3333-5.0741-11.3333-11.3334 0-6.2592 5.0741-11.3333 11.3333-11.3333 6.2593 0 11.3334 5.0741 11.3334 11.3333z"
                fill="none"
              ></path>
            </svg>
          </div>
          <div>搜索</div>
        </div>
      </button>
    </IconSearchWarpper>
  );
});

export default IconSearch;
