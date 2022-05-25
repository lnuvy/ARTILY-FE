import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";

// 당장 리스트의 내용이 없지만 채워질 가능성이 있을때 사용하면 좋을듯
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
    <Grid textAlign="center" margin="160px 0 ">
      {/* 해당 내용이랑 어울리는 디자인 이미지 */}
      {/* <Image /> */}
      <Text>{text1}</Text>
      <Text>{text2}</Text>
      {button ? (
        <Button
          margin="20px auto 0 auto"
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
`;
export default NoInfo;
