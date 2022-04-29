import styled, { keyframes } from "styled-components";

// 2초동안 빠르게 생겼다가 서서히 사라집니다
const toast = keyframes`
0% {
  opacity: 0;
}
25% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

// 스타일 조절 가능
const ToastMessageStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  max-width: 768px;
  height: 76px;
  text-align: center;
  background-color: green;
  border-radius: 14px;
  position: fixed;
  z-index: 10;
  bottom: 160px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${toast} 2.2s;
`;

export default ToastMessageStyle;
