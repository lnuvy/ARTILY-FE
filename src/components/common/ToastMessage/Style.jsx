import styled, { keyframes } from "styled-components";

const toast = keyframes`
0% {
  opacity: 0;
}
30% {
  opacity: 1;
}
50% {
  
}
100% {
  opacity: 0;
}
`;

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
  animation: ${toast} 2.5s;
`;

export default ToastMessageStyle;
