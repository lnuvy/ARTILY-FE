import React from "react";
import styled from "styled-components";
import { Flex, Text, Wrap } from "../elements";
import theme from "../styles/theme";

const Footer = () => {
  return (
    <Container>
      <Wrap width="100%" height="fit-content" padding="28px 32px 28px">
        <Text h2 color="white" margin="0 0 12px 0">
          ARTILY
        </Text>
        <Flex margin="0 0 0 0">
          <Text body2 color="white" margin="0 8px 0 0">
            Team Github
          </Text>
          <Text color={theme.color.brandColor}>
            <a
              href="https://github.com/lnuvy/mvp-project"
              target="_blank"
              rel="noreferrer"
            >
              FrontEnd
            </a>
            &nbsp;<span style={{ color: "white" }}>/</span>&nbsp;
            <a
              href="https://github.com/OhJinwooo/Project-BE"
              target="_blank"
              rel="noreferrer"
            >
              BackEnd
            </a>
          </Text>
        </Flex>
        {/* <Text color="white" margin="0 0 12px 0">
          footer 영역
        </Text> */}
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.pallete.gray4};
`;

export default Footer;
