import styled from "styled-components";

export const CenterWrapper = styled.div`
  z-index: 0;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  padding: 0 48px;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .NSCont {
      position: relative;
      /* background-color: red; */
      .popoverSolt {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .backCont {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 96px;
      transform: scaleY(2.08);
      transition: transform 451.75438596491193ms
        linear(
          0,
          0.18557241650572898,
          0.46530560393651493,
          0.6823338821577483,
          0.8223254801509006,
          0.9049744175651648,
          0.951288850000914,
          0.9763638545339052,
          0.9896118636450829,
          0.9964846505475399,
          1
        );
      background-color: #222;
      background: linear-gradient(180deg, #ffffff 39.9%, #f8f8f8 100%);
      transform-origin: top;
      box-sizing: border-box;
    }
    .backCont::after {
      content: "";
      left: 0;
      bottom: -2px;
      height: 2px;
      width: 100%;
      position: absolute;
      box-sizing: border-box;
      background-color: #ebebeb;
      transform-origin: top;
      transition: transform 451.75438596491193ms
        linear(
          0,
          0.18557241650572898,
          0.46530560393651493,
          0.6823338821577483,
          0.8223254801509006,
          0.9049744175651648,
          0.951288850000914,
          0.9763638545339052,
          0.9896118636450829,
          0.9964846505475399,
          1
        );
      transform: scaleY(0.48);
    }
  }
`;
