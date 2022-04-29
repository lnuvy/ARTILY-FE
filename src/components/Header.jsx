import React from "react";
import styled from "styled-components";
import { Flex, Icon, Text, Tab, Grid } from "../elements/index";
import { Navigation } from "../components";

const Header = (props) => {
  const { children, cg, width, gtc, textAlign, padding, icon1, icon2 } = props;

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
          ARTILY
        </Text>
        <Icon margin="0 16px 0 0" />
        <Icon />
      </Flex>
      <Navigation />
      <Grid gtc="auto auto auto auto" cg="20px">
        {/* <Tab>홈</Tab>
        <Tab>스토어</Tab>
        <Tab>리뷰</Tab>
        <Tab>마이페이지</Tab> */}
      </Grid>
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
