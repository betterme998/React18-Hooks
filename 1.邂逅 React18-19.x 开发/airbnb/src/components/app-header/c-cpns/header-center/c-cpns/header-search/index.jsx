import React, { memo, useState, useMemo } from "react";
import { SearchWarpper } from "./style";
import { Segmented, ConfigProvider, Popover } from "antd";

const HeaderSearch = memo(() => {
  const [navIndex, setNavIndex] = useState(0); //状态控制导航指示器位置

  const handleLiChange = (index) => {
    setNavIndex(index);
  };

  // const options = useMemo(() => {
  //   const label = ["Daily", "Weekly", "Monthly"];
  //   const content = (
  //     <div>
  //       <p>Content</p>
  //       <p>Content</p>
  //     </div>
  //   );
  //   return label.map((item) => {
  //     return {
  //       label: (
  //         <Popover content={content} title="Title" trigger="click">
  //           <div
  //             style={{ width: "100%", textAlign: "center", userSelect: "none" }}
  //           >
  //             {label}
  //           </div>
  //         </Popover>
  //       ),
  //     };
  //   });
  // }, []);
  const labels = ["Daily", "Weekly", "Monthly"];

  const options = labels.map((label) => ({
    label: (
      <Popover
        content={<div style={{ padding: 8 }}>{label} 的弹窗内容</div>}
        trigger="click"
        placement="bottom"
      >
        <div style={{ width: "100%", textAlign: "center", userSelect: "none" }}>
          {label}
        </div>
      </Popover>
    ),
    value: label,
  }));
  console.log(options.values());

  return (
    <SearchWarpper className="headerSegmented">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              trackPadding: 0,
            },
          },
        }}
      >
        <Segmented
          // options={["Daily", "Weekly", "Monthly"]}
          options={options}
          size="large"
          block
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
