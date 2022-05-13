import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Icon, Wrap } from "../elements/index";
import { inputSpaceReg, priceComma } from "../shared/utils";

// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울
const OtherWorkCard = (props) => {
  // const postList = useSelector((state) => state.store.list);
  // console.log(postList);

  const { onClick, postId, postTitle, price } = props;

  return (
    <Card>
      <Image height="168px" />
      <Wrap margin="0 0 ">
        <Text>{postTitle}</Text>
        <Text>{priceComma(price)}원</Text>
      </Wrap>
    </Card>
  );
};

const DisplayNone = styled.div`
  display: none;
`;

export default OtherWorkCard;
