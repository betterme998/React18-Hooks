import React, { memo, useEffect, useState, useRef } from "react";
import { IconSearchWarpper } from "./style";
import { styleStrToObject } from "../utils";

const IconSearch = memo(({ select }) => {
  const [action, setAction] = useState(false);
  const touchTimeoutRef = useRef(null);
  // 清除定时器
  useEffect(() => {
    const touchTimer = touchTimeoutRef.current;
    return () => {
      if (touchTimer) {
        clearImmediate(touchTimer);
      }
    };
  }, []);
  useEffect(() => {
    if (select) {
      touchTimeoutRef.current = setTimeout(() => {
        setAction(true);
      }, 2000);
    } else {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
      setAction(false);
    }
    return () => clearTimeout(touchTimeoutRef.current);
  }, [select]);
  return (
    <IconSearchWarpper>
      <button className={`${select ? "icon-search-button-active" : ""}`}>
        <div
          className={`icon-search-container ${select ? "icon-search-container-active" : ""}`}
        >
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
          <div
            className={`icon-search-text ${action ? "icon-search-text-active" : ""}`}
          >
            搜索
          </div>
        </div>
      </button>
    </IconSearchWarpper>
  );
});

export default IconSearch;
