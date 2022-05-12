import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/user";
import ToastReducer from "./modules/ToastMessage";
import ModalReducer from "./modules/modal";
import MainReducer from "./modules/main";
import StoresReducer from "./modules/store";
import ReviewReducer from "./modules/reviews";
import ImageReducer from "./modules/image";
import ChatReducer from "./modules/chat";
//마이페이지에서 사용할 모듈 추가
import MyStoresReducer from "./modules/mypage";
import BuyReducer from "./modules/buy";

export const history = createBrowserHistory({ basename: "/" });

const rootReducer = combineReducers({
  user: userReducer,
  //프로필 이미지 설정시 사용할 모듈
  toastMessage: ToastReducer,
  modal: ModalReducer,
  main: MainReducer,
  store: StoresReducer,
  mystore: MyStoresReducer,
  //5.6 구매내역 리스트 불러올 모듈
  buylist: BuyReducer,
  review: ReviewReducer,
  image: ImageReducer,
  chat: ChatReducer,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

// // 개발 환경일때, redux-logger 사용하기 5/11 너무 거추장스러워서 없앰 아래 주석풀면 다시 생김
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
