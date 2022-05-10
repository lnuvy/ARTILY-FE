import React, { useEffect, useState } from "react";
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
  ReviewDetail,
  MypageEdit,
  Manage,
  DetailProfile,
  ReviewWrite,
  Buylist,
} from "./pages";
import { Test } from "./pages";
import { history } from "./redux/configureStore";
import ToastMessage from "./shared/ToastMessage";
import Modal from "./shared/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./shared/token";
import { actionCreators as userActions } from "./redux/modules/user";
import { socket } from "./shared/socket";
import styled from "styled-components";

import { removeToken } from "./shared/token";
import { receiveChat, receiveChatRoom } from "./redux/modules/chat";
import theme from "./styles/theme";

function App() {
  const dispatch = useDispatch();
  // 리덕스에서 모달 정보 가져오기(디폴트는 false)
  const modalOn = useSelector((state) => state.modal.modalOn);
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    if (getToken()) {
      dispatch(userActions.getUserInfo());
    }
  }, []);

  useEffect(() => {
    socket.on("session", ({ sessionID, userId }) => {
      console.log(sessionID);
      socket.auth = { sessionID };
      if (sessionID) {
        localStorage.setItem("sessionID", sessionID);
      }
      socket.userId = userId;
    });
  }, []);

  useEffect(() => {
    if (userInfo) {
      const sessionID = localStorage.getItem("sessionID") || null;
      socket.auth = { sessionID, userInfo };
      socket.connect();
    }
  }, [userInfo]);

  useEffect(() => {
    // 판매자 입장
    socket.on("join_room", (data) => {
      dispatch(receiveChatRoom(data));
      socket.emit("enter_room", data.roomName);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(receiveChat(data));
    });
  }, []);

  return (
    <>
      <MaxContainer>
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
            <Route exact path="/review" component={Review} />
            <Route exact path="/review/:reviewId" component={ReviewDetail} />
            <Route exact path="/review/write" component={ReviewWrite} />
            <Route path="/test" component={Test} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/regionset" exact component={RegionSet} />
            <Route path="/profile" exact component={Setprofile} />
            <Route path="/oauth/kakao/callback" component={RedirectKakao} />
            <Route path="/oauth/naver/callback" component={RedirectNaver} />
            <Route path="/mypage/edit" exact component={MypageEdit} />
            <Route path="/mypage/manage" exact component={Manage} />
            <Route path="/profile/detail" exact component={DetailProfile} />

            {/* <Route path="/*" component={NotFound} /> */}
            <Route path="/*" component={Test} />
          </Switch>

          {/* modalOn 값이 true 일때만 모달 켜기 */}
          {modalOn && <Modal />}

          <ToastMessage />
        </ConnectedRouter>
      </MaxContainer>
    </>
  );
}
export default App;

/// May9 MaxContainer로 최대 너비 지정 -> 모바일 최적화로 맞추기 위함

const MaxContainer = styled.div`
  max-width: ${theme.view.maxWidth};
  min-height: 100vh;
  height: fit-content;
  background-color: white;
  margin: 0 auto;
`;
