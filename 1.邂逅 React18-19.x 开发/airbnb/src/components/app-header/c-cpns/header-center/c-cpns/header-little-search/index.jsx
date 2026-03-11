import React, { memo } from "react";
import { HeaderLittleSearchWarpper } from "./style";
import littleImg from "./config/littleImg.config.js";
import IconSearch from "@/assets/svg/icon_search";

const headerLittleSearch = memo((props) => {
  return (
    <HeaderLittleSearchWarpper>
      <div className="LittleSearchCont">
        <span className="LittleSpan">开始搜索</span>
        <div className="LittleBoder"></div>
        <div className="LittleItem">
          <button className="LittleButton LittleButtonLeft">
            <span className="LittleSpan">位置</span>
            <div className="LittleImgCont">
              <img
                className="LittleImg"
                src={littleImg[0].posterActive}
                alt=""
              />
            </div>
            <div className="LittleItemText">任何地方</div>
          </button>
          <span className="LittleSeparate"></span>
          <button className="LittleButton">
            <span className="LittleSpan">入住/退房</span>
            <div className="LittleItemText LittleItemTextCentre">任何时间</div>
          </button>
          <span className="LittleSeparate"></span>
          <button className="LittleButton LittleButtonRight">
            <span className="LittleSpan">客人</span>
            <div className="LittleItemText LittleItemTextCentre">添加人数</div>
          </button>
        </div>
        <div className="LittleSearch">
          <IconSearch width={32} height={24} />
        </div>
      </div>
    </HeaderLittleSearchWarpper>
  );
});

export default headerLittleSearch;
