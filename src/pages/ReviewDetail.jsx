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
} from "../elements";
import { Card, Navigation, ArtCard } from "../components";
import {
  getNowReview,
  getReview,
  getReviewOne,
} from "../redux/modules/reviews";
import { useParams } from "react-router-dom";

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
          <Wrap margin="16px">
            <Text h1 contents={current.reviewData.reviewTitle}></Text>
            <Flex margin="8px 0 0 0" jc="space-between">
              <Flex>
                <Image shape="circle" size="20" />
                <Text
                  margin="0 0 0 4px"
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
          <Wrap padding="16px" bc="rgba(0,0,0,0.1)">
            <Flex>
              <Text h2 lineHeight="22px">
                구매한 작품
              </Text>
            </Flex>
            <Flex>
              <Image width="96px" height="96px" />
              <Wrap margin="0 0 0 16px ">
                <Text>작품명</Text>
                <Text>15,000원</Text>
                <Flex>
                  <Image shape="circle" size="20" />
                  <Text margin="0 0 0 4px">작가명</Text>
                </Flex>
              </Wrap>
            </Flex>
          </Wrap>
          <Wrap margin="16px">
            <Flex>
              <Text h2>작가명의 다른 작품</Text>
              <Text margin="0 0 0 8px" fg="1" lineHeight="22px">
                팔로우
              </Text>
              <Text lineHeight="22px">더보기</Text>
            </Flex>
            <Card>
              <Flex>
                <Image width="96px" height="96px" />
                <Wrap margin="0 0 0 16px ">
                  <Text>작품명</Text>
                  <Text>15,000원</Text>
                </Wrap>
              </Flex>
            </Card>
          </Wrap>
        </>
      ) : null}
    </>
  );
};

export default ReviewDetail;
