import React, { memo } from "react";
import { HeaderLittleSearchWarpper } from "./style";
import littleImg from "./config/littleImg.config.js";
const headerLittleSearch = memo((props) => {
  return (
    <HeaderLittleSearchWarpper>
      <div className="LittleSearchCont">
        <span className="LittleSpan">开始搜索</span>
        <div className="LittleBoder">12312313</div>
        <div className="LittleItem">
          <button className="LittleButton">
            <span>位置</span>
            <div>
              <img src={littleImg[0].posterActive} alt="" />
            </div>
          </button>
          <span></span>
          <button className="LittleButton"></button>
          <span></span>
          <button className="LittleButton"></button>
        </div>
      </div>
    </HeaderLittleSearchWarpper>
  );
});

export default headerLittleSearch;
