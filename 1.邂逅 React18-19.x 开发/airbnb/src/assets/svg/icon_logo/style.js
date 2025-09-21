import styled from "styled-components";

export const IconWrapper = styled.div`
  .Container {
    height: 37.02px;
    /* 通过styled-components的ThemeProvider传递过来的主题色 */
    color: ${(props) => props.theme.color.primaryColor};
  }
`;
