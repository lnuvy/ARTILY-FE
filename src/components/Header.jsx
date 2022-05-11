import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text, Grid } from "../elements/index";
import { Navigation } from "../components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Logo } from "../assets/images/index";
import { Notification, Chat, Close } from "../assets/icons/index";
import { getToken, insertToken } from "../shared/token";
// 뒤로가기 아이콘
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = (props) => {
  const path = useLocation().pathname;
  // console.log(
  //   "Navigation 보이는곳과 안보이는곳 여기서 주소로 특정하는게 좋아보임",
  //   path
  // );
  const isLogin = useSelector((state) => state.user.isLogin);

  const { cg, width, gtc, textAlign, padding, icon1, icon2 } = props;

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

  if (isShowNow)
    return (
      <HeaderStyle {...styles}>
        {/* May9 아이콘 버튼의 경우 Icon 컴포넌트 안에 이미지를 넣어 감싸는식으로 작업 */}
        <Flex margin="0 0 18px">
          <Icon
            fg="1"
            height="22px"
            width="69px"
            onClick={() => history.push("/")}
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
              //로그인 시에만 채팅 목록을 볼 수 있도록 조건 추가했습니다 -영경
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
        {/* <Grid gtc="1fr 1fr 1fr 1fr" cg="20px"></Grid> */}
      </HeaderStyle>
    );
  else if (isWrite) {
    return (
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
    );
  } else
    return (
      <HeaderStyle>
        <Flex height="48px">
          <Icon onClick={() => history.goBack()}>
            <IoIosArrowBack size={36} color="black" />
          </Icon>
        </Flex>
      </HeaderStyle>
    );
};

Header.defaultProps = {
  padding: "16px 16px 0",
};

const HeaderStyle = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
`;

export default Header;
