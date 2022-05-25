import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text } from "../elements/index";
import { Navigation } from "../components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Logo } from "../assets/images/index";
import { Notification, Chat, Close } from "../assets/icons/index";
// 뒤로가기 아이콘
import { useSelector } from "react-redux";
import ArrowBack from "../assets/icons/ArrowBack";
import theme from "../styles/theme";

const Header = (props) => {
  const path = useLocation().pathname;
  // console.log(
  //   "Navigation 보이는곳과 안보이는곳 여기서 주소로 특정하는게 좋아보임",
  //   path
  // );
  const isLogin = useSelector((state) => state.user.isLogin);
  const roomName = useSelector((state) => state.chat.nowChat.roomName);
  console.log(roomName);
  const { cg, width, gtc, textAlign, padding } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    width,
    padding,
  };

  // 탭이 보여야하는 곳인지 검사
  const isShowNow =
    path === "/" ||
    path === "/home" ||
    path === "/store" ||
    path === "/review" ||
    path === "/mypage";

  const isWrite = path === "/review/write";

  const reviewWrite = path === "/review/write";
  const storeWrite = path === "/store/write";
  const Notarrowbtn =
    path === "/profile" ||
    path === "/profile/detail" ||
    path === "/mypage/edit" ||
    path === `/chat/${roomName}`;

  if (isShowNow)
    return (
      <>
        <HeaderStyle {...styles}>
          {/* May9 아이콘 버튼의 경우 Icon 컴포넌트 안에 이미지를 넣어 감싸는식으로 작업 */}
          <Flex margin="0 0 18px">
            <Icon
              fg="1"
              height="22px"
              width="69px"
              onClick={() => history.push("/home")}
            >
              <Logo />
            </Icon>
            <Icon
              onClick={(e) => {
                e.stopPropagation();
                history.push("/chat");
              }}
              margin="0 16px 0 0"
            >
              <Notification margin="0 16px 0 0" />
            </Icon>
            <Icon
              onClick={(e) => {
                //로그인 시에만 채팅 목록을 볼 수 있도록 조건 추가
                if (!isLogin) {
                  history.push("/login");
                } else {
                  e.stopPropagation();
                  history.push("/chat");
                }
              }}
            >
              <Chat margin="0 16px 0 0" />
            </Icon>
          </Flex>
          <Navigation />
        </HeaderStyle>
        <ContentsContainer />
      </>
    );
  else if (isWrite) {
    return (
      <>
        <HeaderStyle>
          <Flex height="48px" margin="0 60px 0 0">
            <Icon margin="0 0 0 16px" onClick={() => history.goBack()}>
              <Close />
            </Icon>
            <Text fg="1" textAlign="center">
              {reviewWrite && "리뷰 등록"}
              {storeWrite && "작품 등록"}
            </Text>
          </Flex>
        </HeaderStyle>
        <ContentsContainer2 />
      </>
    );
  } else if (!Notarrowbtn) {
    return (
      <>
        <HeaderStyle>
          <Flex height="48px">
            <Icon margin="16px 8px" onClick={() => history.goBack()}>
              <ArrowBack />
            </Icon>
          </Flex>
        </HeaderStyle>
        <ContentsContainer2 />
      </>
    );
  }
};

Header.defaultProps = {
  padding: "16px 16px 0",
};

const HeaderStyle = styled.div`
  width: 100vw;
  max-width: ${theme.view.maxWidth};
  height: fit-content;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
  position: fixed;
  background-color: white;
  z-index: 99;
`;

const ContentsContainer = styled.div`
  padding-top: 98px;
`;

const ContentsContainer2 = styled.div`
  padding-top: 48px;
`;

export default Header;
