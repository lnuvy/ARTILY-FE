import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;
  user-select: none;
}

body {
  background-color: rgba(0, 0, 0, 0.1);
  
  -webkit-font-smoothing: antialiased;
}

input, textarea { 
  -webkit-user-select : auto;
}

*::-webkit-scrollbar {
  display: none;
}

`;

export default GlobalStyle;
