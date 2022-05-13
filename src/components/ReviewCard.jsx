import React from "react";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Icon } from "../elements/index";
import theme from "../styles/theme";
import { Favorite } from "../assets/icons";

const ReviewCard = (props) => {
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
    // 5.11 프로필 이미지 추가했습니다 -영경
    profileImage,
  } = props;

  return (
    <Card onClick={onClick}>
      <Image height="168px" br="8px" src={imageUrl} />
      <Text medium margin="8px 0 0">
        {reviewTitle}
      </Text>
      <Text body2 margin="3px 0 0" color={`${theme.pallete.gray3}`}>
        {reviewContent}
      </Text>
      <Flex margin="8px 0 0 0">
        {/* 5.11 프로필 이미지 src 추가했습니다 -영경*/}
        <Image circle size="24" src={profileImage} />
        <Text fg="1" margin="0 0 0 8px">
          {nickname}
        </Text>
        <Icon width="fit-content">
          <Flex>
            <Favorite />
            <Text body2 margin="0 0 0 4px">
              {likeCnt}
            </Text>
          </Flex>
        </Icon>
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
