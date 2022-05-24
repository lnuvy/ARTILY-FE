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
import { FollowCheck, OtherWorkCard } from "../components";
import { FavoriteFilled, Favorite } from "../assets/icons/index";
// modules
import {
  getReviewOne,
  getNowReview,
  likeReviewDB,
  deleteReviewDB,
} from "../redux/modules/reviews";
import { addFollowDB, getFollowDB } from "../redux/modules/follow";
import { priceComma } from "../shared/utils";
import { NoInfo } from "../components";
const ReviewDetail = (props) => {
  const dispatch = useDispatch();

  const reviewId = useParams();

  const myFollowList = useSelector((state) => state.followUser.myFollowing);
  const detailData = useSelector((state) => state.review.detailData);
  const currentUser = useSelector((state) => state.user?.user);
  console.log(detailData);
  const isMe =
    detailData?.buyer && detailData?.buyer[0]?.userId === currentUser?.userId;

  function deleteFunc() {
    dispatch(deleteReviewDB(reviewId.reviewId));
  }

  function likeFunc() {
    dispatch(likeReviewDB(reviewId.reviewId));
  }

  function goDifferentWorkFunc(postId) {
    history.push(`/store/view/${postId}`);
  }

  function loginAlert() {
    alert("로그인하세요.");
  }

  // 팔로우정보
  const [nowFollowing, setNowFollowing] = useState(false);
  const [nowsellerFollowing, setNowSellerFollowing] = useState(false);

  // 팔로우 토글
  const followToggle = () => {
    const userData = {
      followId: detailData.buyer[0].userId,
      followName: detailData.buyer[0].nickname,
      profileImage: detailData.buyer[0].profileImage,
    };
    console.log(userData);

    dispatch(addFollowDB(userData));
    setNowFollowing(!nowFollowing);
  };
  const sellerfollow = () => {
    const userData = {
      followId: detailData.buyer[0].seller.user.userId,
      followName: detailData.buyer[0].nickname,
      profileImage: detailData.buyer[0].profileImage,
    };
    console.log(userData);

    dispatch(addFollowDB(userData));
    setNowSellerFollowing(!nowsellerFollowing);
  };

  useEffect(() => {
    // reset
    dispatch(getNowReview({ buyer: [], defferentInfo: [] }));
  }, []);

  useEffect(() => {
    // get
    console.log(reviewId);
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);
  //

  return (
    <>
      {/* {console.log(Array.isArray(detailData.buyer))} */}
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
                            history.push(`/review/edit/${reviewId.reviewId}`);
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
                        <Flex padding="6px" onClick={followToggle}>
                          <FollowCheck text follow={nowFollowing} />
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
                    src={`${v.seller.imageUrl}`}
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
                  <Seller>
                    <Text h3>
                      <span className="seller">{v.seller.user.nickname} </span>
                      님의 다른 작품
                    </Text>
                  </Seller>
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
                        <Flex padding="6px" onClick={sellerfollow}>
                          <FollowCheck text follow={nowsellerFollowing} />
                        </Flex>
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
                <NoInfo
                  list={detailData.defferentInfo}
                  text1="아직 작가의 다른 작품이 없어요."
                  text2="다른 작가의 작품을 구경해보시겠어요?"
                  underlineBtn="스토어로 이동"
                  movePage="/store"
                >
                  <Grid gtc="1fr 1fr">
                    {console.log(detailData)}
                    {detailData.defferentInfo &&
                      detailData.defferentInfo.map((v, i) => {
                        return (
                          <>
                            <OtherWorkCard
                              key={i}
                              {...v}
                              onClick={() =>
                                history.push(`/store/view/${v.postId}`)
                              }
                              src={v.images && v.images[0].imageUrl}
                            />
                          </>
                        );
                      })}
                  </Grid>
                </NoInfo>
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
const Seller = styled.div`
  .seller {
    font-weight: bold;
  }
`;
