import React, { memo } from "react";
import { RightWrapper } from "./style";
import { IconLanguage, IconList } from "@/assets/svg";

const HeaderRight = memo(() => {
  return (
    <RightWrapper>
      <IconLanguage />
      <IconList />
    </RightWrapper>
  );
});

export default HeaderRight;
