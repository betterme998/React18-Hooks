import React, { memo, useState } from "react";
import { SearchWarpper } from "./style";
import { Radio } from "antd";
const plainOptions = ["Apple", "Pear", "Orange", "Banana"];

const HeaderSearch = memo(() => {
  const [navIndex, setNavIndex] = useState(0); //状态控制导航指示器位置

  const handleNavChange = ({ target: { value } }) => {
    setNavIndex(value);
    console.log("radio1 checked", value);
  };
  const handleLiChange = (index) => {
    setNavIndex(index);
  };
  return (
    <SearchWarpper $activeIndex={navIndex}>
      <div className="Shadow">
        <div className="Shadow-white"></div>
        <div className="Shadow-black"></div>
      </div>
      <Radio.Group
        name="radiogroup"
        value={navIndex} //绑定到状态
        onChange={handleNavChange} //添加change事件
        options={[
          { value: 0, label: "A" },
          { value: 1, label: "B" },
          { value: 2, label: "C" },
          { value: 3, label: "D" },
          { value: 4, label: "B" },
          { value: 5, label: "C" },
          { value: 6, label: "D" },
        ]}
        optionType="button"
      />

      {/* <nav>
        <ul>
          {plainOptions.map((item, index) => {
            return (
              <li onClick={() => handleLiChange(index)}>
                <label htmlFor="radiogroup">{item}</label>
              </li>
            );
          })}
        </ul>
      </nav> */}
    </SearchWarpper>
  );
});

export default HeaderSearch;
