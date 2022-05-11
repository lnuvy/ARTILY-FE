import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {
  Flex,
  Icon,
  Text,
  Tab,
  Grid,
  Checkbox,
  Wrap,
  ImageCarousel,
  Image,
  Button,
} from "../elements";
import { Card, Navigation, ArtCard, OtherWorkCard } from "../components";
import {
  getNowReview,
  getReview,
  getReviewOne,
} from "../redux/modules/reviews";
import { useParams } from "react-router-dom";
import theme from "../styles/theme";

const ReviewDetail = (props) => {
  const dispatch = useDispatch();
  const reviewId = useParams();
  const current = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);

  // const isMe = userId === currentUser?.userId;

  return (
    <>
      {current.reviewData ? (
        <>
          <Wrap margin="16px 16px 8px">
            <Text h1 contents={current.reviewData.reviewTitle}></Text>
            <Flex margin="8px 0 0 0" jc="space-between">
              <Flex>
                <Image circle size="32" />
                <Text
                  margin="0 0 0 8px"
                  contents={current.reviewData.nickname}
                ></Text>
              </Flex>
              <Flex>
                {/* {isMe ? (
              <>
                <Text body2>수정하기</Text> &nbsp;
                <Text body2>삭제하기</Text>
              </>
            ) : (
              <>
                <Text body2>팔로우</Text> &nbsp;
                <Text body2>신고</Text>
              </>
            )} */}
              </Flex>
            </Flex>
          </Wrap>
          <ImageCarousel src={current.reviewData.imageUrl} />
          <Wrap margin="16px">
            <Text contents={current.reviewData.reviewContent}></Text>
          </Wrap>
          <Wrap padding="10px 16px 16px" bc={`${theme.pallete.primary100}`}>
            <Flex>
              <Text h2 lineHeight="22px" margin="0 0 8px">
                구매한 작품
              </Text>
            </Flex>
            <Flex>
              <Image width="96px" height="96px" />
              <Wrap margin="0 0 0 16px ">
                <Text h3 medium margin="0 0 8px">
                  작품명
                </Text>
                <Text margin="0 0 8px">15,000원</Text>
                <Flex>
                  <Image circle size="32" />
                  <Text margin="0 0 0 8px">작가명</Text>
                </Flex>
              </Wrap>
            </Flex>
          </Wrap>
          <Wrap margin="16px">
            <Flex margin="0 0 11px">
              <Text h2>작가명의 다른 작품</Text>
              <Wrap margin="0 0 0 8px" fg="1">
                <Button
                  fontSize="16px"
                  color={`${theme.color.brandColor}`}
                  text
                >
                  팔로우
                </Button>
              </Wrap>
              <Text lineHeight="22px">
                <Button
                  fontSize="16px"
                  color={`${theme.color.brandColor}`}
                  text
                >
                  더보기
                </Button>
              </Text>
            </Flex>
            <Grid gtc="auto auto">
              <OtherWorkCard />
              <OtherWorkCard />
              <OtherWorkCard />
              <OtherWorkCard />
            </Grid>
          </Wrap>
        </>
      ) : null}
    </>
  );
};

export default ReviewDetail;
