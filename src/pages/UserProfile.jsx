import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ArtCard, NoInfo, SocialUrl } from "../components";
import { Flex, Grid, Image, Text, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { getUserProfile } from "../redux/modules/mypage";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, []);

  const currentUser = useSelector((state) => state?.mypage.userInfo);
  const nowUser = useSelector((state) => state?.mypage.userInfo.user);
  const otherUser = currentUser.user;
  const { myMarkups = null, myPosts = null, myReviews = null } = currentUser;

  const [current, setCurrent] = useState(menus[0]);

  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(menus.find((l) => l === innerText));
  };

  return (
    <>
      <Wrap padding="16px">
        <Flex jc="space-between">
          <Flex>
            <Image
              fg="1"
              width="90px"
              height="90px"
              bg="#ddd"
              br="45px"
              border="1px solid #ddd"
              src={
                currentUser && otherUser?.profileImage
                  ? otherUser?.profileImage
                  : ""
              }
            />
            <Wrap margin="0 16px 0 16px">
              <Text h3 bold margin="0 0 10px 0">
                {currentUser && otherUser?.nickname ? otherUser?.nickname : ""}
              </Text>
              <WrapFollow>
                <Grid
                  onClick={() => {
                    history.push(`/userprofile/follow/${userId}`);
                  }}
                >
                  <Text body2 color="#555">
                    팔로워{" "}
                    <Follower>
                      {nowUser?.followerCnt ? nowUser?.followerCnt : "0"}
                    </Follower>
                    명 · 팔로잉{" "}
                    <Follower>
                      {nowUser?.followCnt ? nowUser?.followCnt : "0"}
                    </Follower>
                    명
                  </Text>
                </Grid>
              </WrapFollow>
              <Text body2 color="#555" margin="0.5em 0 0 0">
                등록한 작품{" "}
                {currentUser?.myPosts && currentUser?.myPosts?.length
                  ? currentUser?.myPosts.length
                  : "0"}
                개
              </Text>
            </Wrap>
          </Flex>
        </Flex>

        <Text body1 color="#555" margin="0.5em 0">
          {currentUser && otherUser?.introduce ? otherUser?.introduce : ""}
        </Text>
        <SocialUrl snsUrl={otherUser?.snsUrl} />
      </Wrap>
      <Tab>
        <Grid gtc="auto auto auto" cg="20px">
          {menus.map((menu) => {
            return (
              <CurrentDiv
                key={menu}
                onClick={handleChangeCurrent}
                current={menu === current}
              >
                <Nav>{menu}</Nav>
              </CurrentDiv>
            );
          })}
        </Grid>

        <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="8px 10px">
          {current === "판매목록" && (
            <NoInfo list={myPosts} text="아직 등록한 작품이 없어요.">
              {myPosts &&
                current === "판매목록" &&
                myPosts.map((post) => {
                  return (
                    <ArtCard
                      sellLabel
                      key={`${post.postId}_mypost`}
                      className="sell"
                      {...post}
                      onClick={() => history.push(`/store/view/${post.postId}`)}
                    />
                  );
                })}
            </NoInfo>
          )}
          {current === "리뷰목록" && (
            <NoInfo list={myReviews} text="아직 등록한 작품이 없어요.">
              {myReviews &&
                current === "리뷰목록" &&
                myReviews.map((review) => {
                  return (
                    <ArtCard
                      review
                      key={`${review.reviewId}_myReview`}
                      className="sell"
                      {...review}
                      onClick={() =>
                        history.push(`/review/view/${review.reviewId}`)
                      }
                    />
                  );
                })}
            </NoInfo>
          )}

          {current === "관심목록" && (
            <NoInfo list={myMarkups} text="아직 등록한 작품이 없어요.">
              {myMarkups &&
                current === "관심목록" &&
                myMarkups.map((post) => {
                  return (
                    <ArtCard
                      markup
                      key={`${post.postId}_myMarkup`}
                      className="sell"
                      {...post}
                      onClick={() => history.push(`/store/view/${post.postId}`)}
                    />
                  );
                })}
            </NoInfo>
          )}
        </Grid>
      </Tab>
    </>
  );
};

const CurrentDiv = styled.div`
  font-weight: bold;
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  border-bottom: ${({ current, theme }) =>
    current ? `3px solid ${theme.color.brandColor}` : "3px solid transparent;"};
  // 모바일 파란박스 없애기
  -webkit-tap-highlight-color: transparent;
`;

const Nav = styled.div`
  display: grid;
  width: 100%;
`;

const WrapFollow = styled.div`
  cursor: pointer;
`;
const Follower = styled.span`
  font-weight: bold;
`;

const Tab = styled.div`
  border-top: 1px solid ${({ theme }) => theme.pallete.gray1};
`;
export default UserProfile;
