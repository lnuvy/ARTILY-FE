import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');


* {
  font-family: "Pretendard", "Noto Sans KR", sans-serif; // May8 서체 적용
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;
  user-select: none;
}

body {
  background-color: rgba(0, 0, 0, 0.1);
}

input, textarea { 
  -webkit-user-select : auto;
}

*::-webkit-scrollbar {
  display: none;
}

`;

export default GlobalStyle;
