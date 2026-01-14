import React, { memo, useState, useRef, useEffect } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";
import HeaderPopover from "./c-cpns/header-popover";

import Xx from "./c-cpns/xx";

const HeaderCenter = memo(() => {
  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderPopover>
            {({ setComponentBData, triggerRef, handleTriggerClick }) => (
              <div className="popoverSolt" ref={triggerRef}>
                <HeaderNav />
                <div onClick={handleTriggerClick}>
                  <HeaderSearch setComponentBData={setComponentBData} />
                </div>
              </div>
            )}
          </HeaderPopover>

          {/* <Xx></Xx> */}
        </div>
        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
