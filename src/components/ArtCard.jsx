import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text } from "../elements/index";

const ArtCard = (props) => {
  // key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울
  console.log(props);
  const dispatch = useDispatch();
  // const postList = useSelector((state) => state.store.list);
  // console.log(postList);

  const { user, postTitle, onClick, price, category, transaction } = props;
  const { userId, nickname, profileUrl, address } = user;

  return (
    <Card onClick={onClick}>
      <Image height="120px" />
      <Flex margin="8px 0 0 0">
        <Image shape="circle" size="20" />
        <Text margin="0 0 0 4px">{nickname}</Text>
      </Flex>
      <Text>{postTitle}</Text>
      <Text>
        {transaction} ∙ {address}
      </Text>
      <Text bold>{price}원</Text>
    </Card>
  );
};

export default ArtCard;
