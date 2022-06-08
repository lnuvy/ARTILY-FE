import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";

const NoInfo = ({
  list,
  text1,
  text2,
  button,
  underlineBtn,
  movePage,
  children,
}) => {
  const history = useHistory();
  if (list && list.length > 0) return <>{children}</>;
  return (
    <Grid textAlign="center" margin="60px 0 ">
      <Text>{text1}</Text>
      <Text>{text2}</Text>
      {button ? (
        <Button
          margin="20px auto 0 auto"
          fontSize="14px"
          onClick={() => {
            history.push(movePage);
          }}
        >
          {button}
        </Button>
      ) : (
        ""
      )}
      {underlineBtn ? (
        <Underline
          onClick={() => {
            history.push(movePage);
          }}
        >
          {underlineBtn}
        </Underline>
      ) : (
        ""
      )}
    </Grid>
  );
};
const Underline = styled.div`
  padding: 10px 0px;
  font-size: 13px;
  text-decoration: underline;
  color: ${({ theme }) => theme.pallete.gray2};
  cursor: pointer;
`;
export default NoInfo;
