import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
// components
import styled from "styled-components";
import theme from "../styles/theme";
import {
  Flex,
  Text,
  Grid,
  Wrap,
  ImageCarousel,
  Image,
  Button,
  Icon,
} from "../elements";
import { OtherWorkCard } from "../components";
import { FavoriteFilled, Favorite } from "../assets/icons/index";
// modules
import {
  getReviewOne,
  getNowReview,
  likeReviewDB,
  deleteReviewDB,
} from "../redux/modules/reviews";
import { addFollowDB } from "../redux/modules/follow";
import { priceComma } from "../shared/utils";

const ReviewDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // reset
    dispatch(getNowReview([]));
    // get
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);
  //
  const reviewId = useParams();

  const reviewData = useSelector((state) => state.review.reviewData);
  const detailData = useSelector((state) => state.review.detailData);
  const currentUser = useSelector((state) => state.user?.user);

  const isMe = reviewData?.user?.userId === currentUser?.userId;

  //리뷰를 쓴 유저 아이디(혹은 닉네임)가 내 팔로우 리스트에 있다면(=이미 팔로우 중이라면) 언팔로우 버튼 보이게
  //아직 구현못함
  function editFunc() {
    history.push(`/review/edit/${reviewId}`);
  }

  function deleteFunc() {
    dispatch(deleteReviewDB(reviewId.reviewId));
  }

  function likeFunc() {
    dispatch(likeReviewDB(reviewId.reviewId));
  }

  function loginAlert() {
    alert("로그인하세요.");
  }

  return (
    <>
      {console.log(Array.isArray(detailData.buyer))}
      {detailData.buyer &&
        detailData.buyer.map((v) => (
          <>
            <Wrap padding="0 0 72px">
              <Wrap margin="16px 16px 8px">
                <Text h1>{v.reviewTitle}</Text>
                <Flex margin="8px 0 0 0" jc="space-between">
                  <Flex>
                    <Image circle size="32" src={v.profileImage} />
                    <Text margin="0 0 0 8px" contents={v.nickname}></Text>
                  </Flex>
                  <Flex>
                    {isMe ? (
                      <>
                        <Flex
                          padding="6px"
                          onClick={() => {
                            console.log("수정");
                            history.push(`/store/edit/${reviewId}`);
                          }}
                        >
                          <Text body1 color={theme.pallete.primary900}>
                            수정하기
                          </Text>
                        </Flex>
                        <Flex padding="6px 0 6px 6px" onClick={deleteFunc}>
                          <Text body1 color={theme.pallete.primary900}>
                            삭제하기
                          </Text>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex
                          padding="6px"
                          onClick={() => {
                            console.log("팔로우 버튼 눌렀다");
                            dispatch(addFollowDB(v.userId));
                          }}
                        >
                          <Text body1 color={theme.pallete.primary900}>
                            팔로우
                          </Text>
                        </Flex>
                        <Flex
                          padding="6px"
                          onClick={() => {
                            console.log("신고하기");
                          }}
                        >
                          <Text body1 color={theme.pallete.primary900}>
                            신고
                          </Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Wrap>
              <ImageCarousel src={v.images} />
              <Wrap margin="16px">
                <Text contents={v.reviewContent}></Text>
              </Wrap>

              <Wrap padding="10px 16px 16px" bc={`${theme.pallete.primary100}`}>
                <Flex>
                  <Text h2 lineHeight="22px" margin="0 0 8px">
                    구매한 작품
                  </Text>
                </Flex>
                <Flex>
                  <Image
                    width="96px"
                    height="96px"
                    src={`${v.seller.imageUrl[0]}`}
                  />
                  <Wrap margin="0 0 0 16px ">
                    <Text h3 medium margin="0 0 8px">
                      {v.seller.postTitle}
                    </Text>
                    <Text margin="0 0 8px">
                      {v.seller.price ? priceComma(v.seller.price) : 0}원
                    </Text>
                    <Flex>
                      <Image
                        circle
                        size="32"
                        src={`${v.seller.user.profileImage}`}
                      />
                      <Text margin="0 0 0 8px">{v.seller.user.nickname}</Text>
                    </Flex>
                  </Wrap>
                </Flex>
              </Wrap>

              <Wrap margin="16px">
                <Flex margin="0 0 11px">
                  <Text h2>작가명의 다른 작품</Text>
                  {isMe ? (
                    <>
                      <Wrap fg="1"></Wrap>
                      <Text lineHeight="22px">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                        >
                          더보기
                        </Button>
                      </Text>
                    </>
                  ) : (
                    <>
                      <Wrap margin="0 0 0 8px" fg="1">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                          onClick={() => {
                            console.log("팔로우 버튼 눌렀다");
                            dispatch(addFollowDB(v.userId));
                          }}
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
                    </>
                  )}
                </Flex>
                <Grid gtc="1fr 1fr">
                  {detailData.defferents &&
                    detailData.defferents.map((v, i) => {
                      return (
                        <>
                          <OtherWorkCard key={i} {...v} onClick={() => null} />
                        </>
                      );
                    })}
                </Grid>
              </Wrap>
            </Wrap>
            <FixedChatBar>
              <Icon width="fit-content" height="fit-content" onClick={likeFunc}>
                <Flex>
                  {detailData && detailData.myLike === 1 ? (
                    <FavoriteFilled color={theme.color.brandColor} />
                  ) : (
                    <Favorite color={theme.color.brandColor} />
                  )}
                  <Text
                    h3
                    medium
                    margin="0 0 0 4px"
                    color={theme.pallete.gray3}
                  >
                    {v.likeCnt}
                  </Text>
                </Flex>
              </Icon>
            </FixedChatBar>
          </>
        ))}
    </>
  );
};

export default ReviewDetail;

const FixedChatBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid ${theme.pallete.gray1};
  max-width: ${theme.view.maxWidth};
  height: 56px;
`;
