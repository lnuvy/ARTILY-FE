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
import { useParams } from "react-router-dom";

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

  const param = useParams();

  const isWrite =
    (path.split("/")[1] === "review" && path.split("/")[2] === "write") ||
    path === "/store/write" ||
    (path.split("/")[1] === "review" && path.split("/")[2] === "edit") ||
    (path.split("/")[1] === "store" && path.split("/")[2] === "edit");

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
          <WrapLogo>
            <Flex margin="0 0 18px">
              <Icon
                height="22px"
                width="69px"
                onClick={() => history.push("/home")}
              >
                <Logo />
              </Icon>

              {/* <Icon
              onClick={(e) => {
                e.stopPropagation();
                history.push("/chat");
              }}
              margin="0 16px 0 0"
            >
              <Notification margin="0 16px 0 0" />
            </Icon> */}

              <div
                className="logo"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push("/chat");
                  window.location.reload();
                }}
              >
                <Chat margin="0 16px 0 0" />
              </div>
            </Flex>
          </WrapLogo>
          <Navigation />
        </HeaderStyle>
        <ContentsContainer />
      </>
    );
  else if (isWrite === true) {
    {
      console.log(isWrite);
    }
    return (
      <>
        {console.log(path)}
        {console.log(param)}
        <HeaderStyle2>
          <Flex height="48px" margin="0 60px 0 0">
            {console.log(
              path.split("/")[1] === "review" && path.split("/")[2] === "write"
            )}

            {/* <Icon
              margin="0 0 0 16px"
              onClick={() => {
                history.goBack();
              }}
            >
              <Close />
            </Icon> */}
            {console.log(path)}
            <Text medium fg="1" textAlign="center">
              {path.split("/")[3] === "select" ? (
                <Icon margin="16px 8px" onClick={() => history.goBack()}>
                  <ArrowBack />
                </Icon>
              ) : path === `/store/write` ? (
                "작품 등록"
              ) : path.split("/")[1] === "review" &&
                path.split("/")[2] === "edit" ? (
                "리뷰 수정"
              ) : path.split("/")[1] === "store" &&
                path.split("/")[2] === "edit" ? (
                "작품 수정"
              ) : (
                "리뷰 등록"
              )}
            </Text>
          </Flex>
        </HeaderStyle2>
        <ContentsContainer2 />
      </>
    );
  } else if (!Notarrowbtn) {
    return (
      <>
        {console.log(param)}
        <HeaderStyle2>
          <Flex height="48px">
            <Icon margin="16px 8px" onClick={() => history.goBack()}>
              <ArrowBack />
            </Icon>
          </Flex>
        </HeaderStyle2>
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
  height: 98px;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
  position: fixed;
  background-color: white;
  z-index: 99;
`;

const HeaderStyle2 = styled.div`
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
const WrapLogo = styled.div`
  position: relative;
  .logo {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export default Header;
