import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Icon } from "../elements/index";

const ReviewCard = (props) => {
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
    nickname,
    seller,
    createdAt,
    likeCnt,
  } = props;

  return (
    <Card onClick={onClick}>
      <Image height="120px" src={imageUrl} />
      <Text bold>{reviewTitle}</Text>
      <Text>{reviewContent}</Text>
      <Flex margin="8px 0 0 0">
        <Image circle size="20" />
        <Text fg="1" margin="0 0 0 4px">
          {nickname}
        </Text>
        <Icon />
        <Text margin="0 0 0 4px">{likeCnt}</Text>
      </Flex>
      <DisplayNone>
        <Text margin="0 0 0 4px">{createdAt}</Text>
      </DisplayNone>
    </Card>
  );
};

const DisplayNone = styled.div`
  display: none;
`;

export default ReviewCard;
