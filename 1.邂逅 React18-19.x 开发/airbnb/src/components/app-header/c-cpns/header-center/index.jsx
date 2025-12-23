import React, { memo, useState, useRef } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";
import HeaderPopover from "./c-cpns/header-popover";
import Xx from "./c-cpns/xx";

const HeaderCenter = memo(() => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderNav />
          <HeaderSearch />
          <HeaderPopover />
          <Xx></Xx>
        </div>
        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
