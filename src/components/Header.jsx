import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text, Grid } from "../elements/index";
import { Navigation } from "../components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

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

  if (isShowNow)
    return (
      <HeaderStyle {...styles}>
        <Flex onClick={() => history.push("/")}>
          <Text bold fg="1">
            ARTIN
          </Text>
          <Icon margin="0 16px 0 0" />
          <Icon
            onClick={(e) => {
              e.stopPropagation();
              history.push("/chat");
            }}
          />
        </Flex>
        <Navigation />
        <Grid gtc="auto auto auto auto" cg="20px"></Grid>
      </HeaderStyle>
    );
  else
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
  padding: "16px",
};

const HeaderStyle = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
`;

export default Header;
