import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-223393468-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

// 리액트18 공식문서에서 권장하는 index 렌더링
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
