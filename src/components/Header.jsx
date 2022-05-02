import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text, Grid } from "../elements/index";
import { Navigation } from "../components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

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

  return (
    <HeaderStyle {...styles}>
      <Flex>
        <Text bold fg="1">
          <Flex onClick={() => history.push("/")}>ARTILY</Flex>
        </Text>
        <Icon margin="0 16px 0 0" />
        <Icon onClick={() => history.push("/chat")} />
      </Flex>
      <Navigation />
      <Grid gtc="auto auto auto auto" cg="20px"></Grid>
    </HeaderStyle>
  );
};

Header.defaultProps = {
  padding: "16px",
};

const HeaderStyle = styled.div`
  background-color: grey;
  width: 100%;
  height: fit-content;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
`;

export default Header;
