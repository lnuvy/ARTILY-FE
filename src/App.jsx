import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Header } from "./components";
import {
  Chat,
  Follow,
  Home,
  MyPage,
  // NotFound,
  RedirectKakao,
  RedirectNaver,
  Review,
  Login,
  RegionSet,
  Setprofile,
  Store,
  StoreDetail,
  StoreWrite,
  ChatRoom,
} from "./pages";
import { Test } from "./pages";
import { history } from "./redux/configureStore";
import ToastMessage from "./shared/ToastMessage";
import Modal from "./shared/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./shared/token";
import { actionCreators as userActions } from "./redux/modules/user";
import { getPostDB } from "./redux/modules/store";

function App() {
  const dispatch = useDispatch();
  // 리덕스에서 모달 정보 가져오기(디폴트는 false)
  const modalOn = useSelector((state) => state.modal.modalOn);

  useEffect(() => {
    if (getToken()) {
      dispatch(userActions.getUserInfo());
    }
  });

  return (
    <>
      <ConnectedRouter history={history}>
        <Header>ARTIN</Header>
        <Switch>
          <Route path={["/home", "/"]} exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/chat/:id" exact component={ChatRoom} />
          <Route path="/store" exact component={Store} />
          <Route path="/store/view/:postId" exact component={StoreDetail} />
          <Route path="/store/write" exact component={StoreWrite} />
          <Route path="/store/write/:postId" exact component={StoreWrite} />
          <Route path="/follow" exact component={Follow} />
          <Route path="/store" exact component={Store} />
          <Route path="/review" exact component={Review} />
          <Route path="/test" component={Test} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/regionset" exact component={RegionSet} />
          <Route path="/profile" exact component={Setprofile} />
          <Route path="/oauth/kakao/callback" component={RedirectKakao} />
          <Route path="/oauth/naver/callback" component={RedirectNaver} />
          {/* <Route path="/*" component={NotFound} /> */}
          <Route path="/*" component={Test} />
        </Switch>

        {/* modalOn 값이 true 일때만 모달 켜기 */}
        {modalOn && <Modal />}

        <ToastMessage />
      </ConnectedRouter>
    </>
  );
}
export default App;
