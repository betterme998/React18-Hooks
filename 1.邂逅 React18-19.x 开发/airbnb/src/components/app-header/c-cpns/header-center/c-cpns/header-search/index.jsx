import React, { memo, useState } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider } from "antd";

const HeaderSearch = memo(() => {
  const [navIndex, setNavIndex] = useState(0); //状态控制导航指示器位置

  const handleLiChange = (index) => {
    setNavIndex(index);
  };
  return (
    <SearchWarpper className="headerSegmented" $activeIndex={navIndex}>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              block: true,
            },
          },
        }}
      >
        <Segmented
          options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
          size="large"
          shape="round"
          onChange={(value) => {
            console.log(value); // string
          }}
        />
      </ConfigProvider>
    </SearchWarpper>
  );
});

export default HeaderSearch;
