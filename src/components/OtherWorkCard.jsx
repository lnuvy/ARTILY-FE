import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Icon } from "../elements/index";

// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울
const OtherWorkCard = (props) => {
  const location = useLocation();

  // const postList = useSelector((state) => state.store.list);
  // console.log(postList);

  const {
    onClick,
    user,
    reviewTitle,
    category,
    transaction,
    imageUrl,
    reviewId,
    reviewContent,
    _key,
    nickname,
    seller,
    createdAt,
    likeCnt,
  } = props;

  return (
    <Card>
      <Flex>
        <Image width="96px" height="96px" />
        <Wrap margin="0 0 0 16px ">
          <Text>작품명</Text>
          <Text>15,000원</Text>
        </Wrap>
      </Flex>
    </Card>
  );
};

const DisplayNone = styled.div`
  display: none;
`;

export default OtherWorkCard;
