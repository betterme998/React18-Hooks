import React, { memo, useState, useRef, useEffect } from "react";
import { CenterWrapper } from "./style";
import HeaderNav from "./c-cpns/header-nav";
import HeaderSearch from "./c-cpns/header-search";
import HeaderPopover from "./c-cpns/header-popover";
import Xx from "./c-cpns/xx";

const HeaderCenter = memo(() => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查点击是否在触发元素或Popover内容内部
      const isClickInsidePopover = popoverRef.current?.contains(event.target);
      const isClickOnTrigger = triggerRef.current?.contains(event.target);

      // 如果点击不在触发元素也不在Popover内部，则关闭Popover
      if (!isClickOnTrigger && !isClickInsidePopover) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleTriggerClick = () => {
    // 点击触发元素时只打开，不关闭
    console.log(123123);

    if (!open) {
      setOpen(true);
    }
  };
  return (
    <CenterWrapper>
      <form className="search">
        <div className="NSCont">
          <HeaderPopover>
            {({ setComponentBData, triggerRef, handleTriggerClick }) => (
              <div ref={triggerRef}>
                <HeaderNav />

                <div onClick={handleTriggerClick}>
                  <HeaderSearch setComponentBData={setComponentBData} />
                </div>
              </div>
            )}
            {/* <HeaderSearch /> */}
            {/* <div>
              <HeaderSearch />
            </div> */}
          </HeaderPopover>
          {/* <Xx></Xx> */}
        </div>
        <div className="backCont"></div>
      </form>
    </CenterWrapper>
  );
});

export default HeaderCenter;
