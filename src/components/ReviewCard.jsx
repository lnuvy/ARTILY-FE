import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
// components
import { Card } from "../components/index";
import { Flex, Image, Text, Icon } from "../elements/index";
import { Favorite } from "../assets/icons";

const ReviewCard = (props) => {
  // const postList = useSelector((state) => state.store.list);

  const {
    onClick,
    _key,
    //
    nickname,
    profileImage,
    reviewId,
    reviewTitle,
    reviewContent,
    likeCnt,
    images,
    createdAt,
  } = props;

  return (
    <Card onClick={onClick} _key={_key}>
      <Image height="168px" br="8px" src={images} />
      <Text medium margin="8px 0 0">
        {reviewTitle}
      </Text>
      <Text body2 margin="3px 0 0" color={`${theme.pallete.gray3}`}>
        {reviewContent}
      </Text>
      <Flex margin="8px 0 0 0">
        <Image circle size="24" src={profileImage} />
        <Text fg="1" margin="0 0 0 8px">
          {nickname}
        </Text>
        <Icon width="fit-content">
          <Flex>
            <Favorite size="16" color={`${theme.color.brandColor}`} />
            <Text body2 margin="0 0 0 4px">
              {likeCnt}
            </Text>
          </Flex>
        </Icon>
      </Flex>
      <DisplayNone>
        {/* <Text margin="0 0 0 4px">{createdAt}</Text> */}
      </DisplayNone>
    </Card>
  );
};

const DisplayNone = styled.div`
  display: none;
`;

export default ReviewCard;
