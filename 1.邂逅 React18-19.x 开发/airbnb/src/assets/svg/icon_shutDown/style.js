import styled from "styled-components";

export const IconShutDownWrapper = styled.div`
  button {
    border: none;
    background: rgba(0, 0, 0, 0);
    position: relative; // 添加相对定位以确保::before定位正确
    border-radius: 50%;
    padding: 10px;
  }
  button:hover::before {
    background-color: #f7f7f7;
  }
  button::before {
    content: "";
    width: 32px;
    height: 32px;
    display: block;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;
