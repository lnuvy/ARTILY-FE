import React from "react";
import styled from "styled-components";
import { Text, Wrap } from "../elements";
import theme from "../styles/theme";

const Footer = () => {
  return (
    <Container>
      <Wrap width="100vw" height="168px" padding="23px 31px 35px">
        <Text color="white" margin="0 0 12px 0">
          footer 영역
        </Text>
        <Text color="white" margin="0 0 12px 0">
          footer 영역
        </Text>
        <Text color="white" margin="0 0 12px 0">
          footer 영역
        </Text>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.pallete.gray4};
`;

export default Footer;
