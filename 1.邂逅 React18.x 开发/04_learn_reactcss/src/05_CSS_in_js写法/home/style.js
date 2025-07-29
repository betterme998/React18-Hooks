import styled from "styled-components";

export const HomeWrapper = styled.div`
  .top {
    .banner {
      color：: red;
    }
  }
  /* 这里我们从主题当中获取颜色,是使用主题组件包裹<app/>根组件，然后传入props */
  .bottom {
    .header {
      color: ${(props) => props.theme.color};
      font-size: ${(props) => props.theme.size};
    }

    .product-list {
      .item {
        color: blue;
      }
    }
  }
`;
