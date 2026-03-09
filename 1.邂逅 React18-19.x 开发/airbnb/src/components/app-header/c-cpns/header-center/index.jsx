import React, { memo } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";
import HeaderPopover from "./c-cpns/header-popover";
import HeaderLittleSearch from "./c-cpns/header-little-search";

const HeaderCenter = memo(() => {
  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderPopover>
            {({ setComponentBData, triggerRef, handleTriggerClick, open }) => (
              <div className="popoverSolt" ref={triggerRef}>
                <HeaderNav />
                <HeaderSearch
                  setComponentBData={setComponentBData}
                  open={open}
                  handleTriggerClick={handleTriggerClick}
                />
                <HeaderLittleSearch />
              </div>
            )}
          </HeaderPopover>
        </div>
        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
