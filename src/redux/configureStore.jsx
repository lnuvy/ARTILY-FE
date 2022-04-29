import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./modules/user";
import ToastReducer from "./modules/ToastMessage";
import StoresReducer from "./modules/Stores";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,
  toastMessage: ToastReducer,
  store: StoresReducer,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

// 개발 환경일때, redux-logger 사용하기
const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
