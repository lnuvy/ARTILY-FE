import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Header } from "./components";
import { history } from "./redux/configureStore";
import Modal from "./shared/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getUserInfo } from "./redux/modules/user";
import { socket } from "./shared/socket";
import { getChatList } from "./redux/modules/chat";
import theme from "./styles/theme";
import AuthRoute from "./routes/AuthRoute";
import NoAuthRoute from "./routes/NoAuthRoute";
import DragModal from "./shared/modal/DragModal";
// import { Helmet } from "react-helmet";

function App() {
  const dispatch = useDispatch();
  // 리덕스에서 모달 정보 가져오기(디폴트는 false)
  const { modalOn, title } = useSelector((state) => state.modal);
  const { user, isLogin } = useSelector((state) => state.user);

  // useEffect 작업 순서대로 놓음
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserInfo());
    }
  }, []);

  useEffect(() => {
    if (user?.nickname === "") {
      // console.log("app.jsx에서 닉네임이 비었을때 지나치는 useEffect");
      history.replace("/profile");
    }
  }, [user?.nickname]);

  useEffect(() => {
    if (user) {
      dispatch(getChatList());
      if (user?.profileImage && user?.nickname) {
        socket.auth = { user };
        socket.connect();
      }
    }
  }, [user]);

  useEffect(() => {
    socket.on("user connected", (data) => {
      console.log(data);
      // dispatch(chatUserConnected(data));
    });
  });

  useEffect(() => {
    socket.on("user disconnected", (data) => {
      console.log(data);
    });
  });

  return (
    <>
      {/* <Helmet>
        <title>Artily</title>
        <meta property="description" content="신예 작가들의 작품 거래 플랫폼" />
        <meta property="og:title" content="Artily" />
        <meta
          property="og:description"
          content="신예 작가들의 작품 거래 플랫폼"
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/artily-og.png" />
      </Helmet> */}
      {isLogin ? (
        <>
          <MaxContainer>
            <ConnectedRouter history={history}>
              <Header>ARTIN</Header>
              <AuthRoute />

              {modalOn && (title ? <Modal /> : <DragModal />)}
            </ConnectedRouter>
          </MaxContainer>
        </>
      ) : (
        <>
          <MaxContainer>
            <ConnectedRouter history={history}>
              <Header>ARTIN</Header>
              <NoAuthRoute />

              {modalOn && (title ? <Modal /> : <DragModal />)}
            </ConnectedRouter>
          </MaxContainer>
        </>
      )}
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
  position: relative;
  overflow-x: hidden;
`;
