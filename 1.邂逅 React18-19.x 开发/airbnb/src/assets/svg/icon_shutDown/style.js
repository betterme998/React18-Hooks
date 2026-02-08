import styled from "styled-components";

export const IconShutDownWrapper = styled.div`
  button {
    border: none;
    background: rgba(0, 0, 0, 0);
    position: relative; // 添加相对定位以确保::before定位正确
  }
  button::before {
    content: "";
    width: 32px;
    height: 32px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #f7f7f7;
  }
`;
