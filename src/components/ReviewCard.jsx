import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../styles/theme";
// components
import { Card } from "../components/index";
import { Flex, Image, Text, Icon } from "../elements/index";
import { Favorite, FavoriteFilled } from "../assets/icons";
import {
  getReviewData,
  getReviewDB,
  likeReviewListDB,
  myreviewLikeList,
} from "../redux/modules/reviews";

const ReviewCard = (props) => {
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
    //
    category,
  } = props;

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.user);
  const myReviewLikeList = useSelector(
    (state) => state.review.myreviewLikeList2
  );
  const myReviewLikeCheck = myReviewLikeList.find((v) => v === reviewId);

  useEffect(() => {
    dispatch(myreviewLikeList([]));
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(likeReviewListDB());
    }
  }, [myReviewLikeCheck]);

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
            {myReviewLikeCheck && myReviewLikeCheck ? (
              <FavoriteFilled size="16" color={`${theme.color.brandColor}`} />
            ) : (
              <Favorite size="16" color={`${theme.color.brandColor}`} />
            )}

            <Text body2 margin="0 0 0 4px">
              {likeCnt}
            </Text>
          </Flex>
        </Icon>
      </Flex>
      <DisplayNone>
        <Text>{category}</Text>
        <Text>{createdAt}</Text>
      </DisplayNone>
    </Card>
  );
};

const DisplayNone = styled.div`
  display: none;
`;

export default ReviewCard;
