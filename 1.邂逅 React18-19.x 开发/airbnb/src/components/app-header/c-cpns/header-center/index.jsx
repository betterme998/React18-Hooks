import React, { memo } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";

const HeaderCenter = memo(() => {
  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderNav />
          <HeaderSearch />
        </div>
        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
