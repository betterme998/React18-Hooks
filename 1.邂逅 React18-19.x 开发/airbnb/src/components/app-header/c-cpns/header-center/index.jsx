import React, { memo } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";

const HeaderCenter = memo(() => {
  return (
    <CenterWrapper>
      <from className="search">
        <HeaderNav />
        <HeaderSearch />
      </from>
    </CenterWrapper>
  );
});

export default HeaderCenter;
