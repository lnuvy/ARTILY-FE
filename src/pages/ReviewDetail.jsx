import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {
  Flex,
  Text,
  Grid,
  Wrap,
  ImageCarousel,
  Image,
  Button,
} from "../elements";
import { OtherWorkCard } from "../components";
import { getReviewOne, getNowReview } from "../redux/modules/reviews";
import { useParams } from "react-router-dom";
import theme from "../styles/theme";
import { priceComma } from "../shared/utils";
import { deleteReviewDB } from "../redux/modules/reviews.jsx";
import { IoMdHeart } from "react-icons/io";
import { Heart } from "../assets/icons";
import styled from "styled-components";

const ReviewDetail = (props) => {
  const dispatch = useDispatch();
  const reviewId = useParams();
  const current = useSelector((state) => state.review.reviewData);
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user?.user);

  function editFunc() {
    history.push(`/review/edit/${current.buyer.reviewId}`);
  }

  function deleteFunc() {
    dispatch(deleteReviewDB(reviewId.reviewId));
  }

  function loginAlert() {
    alert("로그인하세요.");
  }

  useEffect(() => {
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);

  return (
    <>
      {current && current.buyer && current.defferent && current.sellItemInfo ? (
        <>
          <Wrap padding="0 0 72px">
            <Wrap margin="16px 16px 8px">
              <Text h1 contents={current.buyer.reviewTitle}></Text>
              <Flex margin="8px 0 0 0" jc="space-between">
                <Flex>
                  <Image
                    circle
                    size="32"
                    src={`${current.buyer.profileImage}`}
                  />
                  <Text
                    margin="0 0 0 8px"
                    contents={current.buyer.nickname}
                  ></Text>
                </Flex>
                <Flex>
                  {!user ? (
                    user.user.userId === current.buyer.userId ? (
                      <>
                        <Button
                          fontSize="16px"
                          text
                          color={`${theme.color.brandColor}`}
                          onClick={editFunc}
                        >
                          수정하기
                        </Button>{" "}
                        &nbsp;
                        <Button
                          fontSize="16px"
                          text
                          color={`${theme.color.brandColor}`}
                          onClick={deleteFunc}
                        >
                          삭제하기
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button text>팔로우</Button> &nbsp;
                        <Button text>신고</Button>
                      </>
                    )
                  ) : (
                    <></>
                  )}
                </Flex>
              </Flex>
            </Wrap>
            <ImageCarousel src={current.buyer.imageUrl} />
            <Wrap margin="16px">
              <Text contents={current.buyer.reviewContent}></Text>
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
                  src={`${current.buyer.seller.imageUrl[0]}`}
                />
                <Wrap margin="0 0 0 16px ">
                  <Text h3 medium margin="0 0 8px">
                    {current.buyer.seller.postTitle}
                  </Text>
                  <Text margin="0 0 8px">
                    {current.sellItemInfo.price
                      ? priceComma(current.sellItemInfo.price)
                      : 0}
                    원
                  </Text>
                  <Flex>
                    <Image
                      circle
                      size="32"
                      src={`${current.buyer.seller.user.profileImage}`}
                    />
                    <Text margin="0 0 0 8px">
                      {current.buyer.seller.user.nickname}
                    </Text>
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
              <Grid gtc="1fr 1fr">
                {current.defferent.length
                  ? current.defferent.map((l, i) => {
                      return (
                        <>
                          <OtherWorkCard key={i} {...l} onClick={() => null} />
                        </>
                      );
                    })
                  : null}
              </Grid>
            </Wrap>
          </Wrap>
          {/* <FixedChatBar>
            <Flex onClick={null}>
              {user.isLogin &&
              currentUser &&
              currentUser.myMarkup.find((id) => id === reviewId) ? (
                <IoMdHeart size={24} color={theme.pallete.primary850} />
              ) : (
                <Heart />
              )}

              <Text h3 medium margin="0 0 0 4px" color={theme.pallete.gray3}>
                {current.markupCnt ? current.markupCnt : 0}
              </Text>
            </Flex>
          </FixedChatBar> */}
        </>
      ) : null}
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
