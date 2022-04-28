import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  font-family: "Noto Sans KR", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;
  user-select: none;
}

*::-webkit-scrollbar {
  display: none;
}

`;

export default GlobalStyle;
