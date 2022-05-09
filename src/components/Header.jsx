import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text, Grid } from "../elements/index";
import { Navigation } from "../components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Logo } from "../assets/images/index";
import { Notification, Chat } from "../assets/icons/index";

// 뒤로가기 아이콘
import { IoIosArrowBack } from "react-icons/io";

const Header = (props) => {
  const path = useLocation().pathname;
  // console.log(
  //   "Navigation 보이는곳과 안보이는곳 여기서 주소로 특정하는게 좋아보임",
  //   path
  // );

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
              e.stopPropagation();
              history.push("/chat");
            }}
          >
            <Chat margin="0 16px 0 0" />
          </Icon>
        </Flex>
        <Navigation />
        <Grid gtc="auto auto auto auto" cg="20px"></Grid>
      </HeaderStyle>
    );
  else if (isWrite) {
    return (
      <HeaderStyle>
        <Flex height="48px">
          <Icon
            bc="black"
            margin="0 0 0 16px"
            onClick={() => history.goBack()}
          />
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
