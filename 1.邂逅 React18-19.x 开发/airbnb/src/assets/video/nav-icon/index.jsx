import React, { memo } from "react";
// header组件的导航栏图标组件
const NavIcon = memo(({ poster, videoSrc }) => {
  console.log("navIcon组件渲染");

  return (
    <span>
      <video poster={poster} preload="auto">
        {videoSrc.map((item) => {
          return <source src={item.src} type={item.type} />;
        })}
      </video>
    </span>
  );
});

export default NavIcon;
