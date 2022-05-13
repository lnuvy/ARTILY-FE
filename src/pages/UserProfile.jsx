import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ArtCard, NoInfo, SocialUrl } from "../components";
import { Flex, Grid, Image, Text, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { getmyPageDB } from "../redux/modules/mypage";
import theme from "../styles/theme";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getmyPageDB(userId));
  }, []);

  const currentUser = useSelector((state) => state.mystore.list);

  const {
    myMarkup = null,
    myPost = null,
    myReview = null,
    myprofile = null,
  } = currentUser;

  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
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
                myprofile && myprofile?.profileImage
                  ? myprofile?.profileImage
                  : ""
              }
            />
            <Wrap margin="0 16px 0 16px">
              <Text h3 bold margin="0 0 10px 0">
                {myprofile && myprofile?.nickname ? myprofile?.nickname : ""}
              </Text>
              <Text body2 color="#555">
                팔로워{" "}
                <Follower
                  onClick={() => {
                    history.push("/follow");
                  }}
                >
                  1
                </Follower>
                명 · 팔로잉{" "}
                <Follower
                  onClick={() => {
                    history.push("/follow");
                  }}
                >
                  1
                </Follower>
                명
              </Text>
              <Text body2 color="#555" margin="0.5em 0 0 0">
                등록한 작품 {currentUser.myPost && currentUser?.myPost.length}개
              </Text>
            </Wrap>
          </Flex>
        </Flex>

        <Text body1 color="#555" margin="0.5em 0">
          {myprofile && myprofile.introduce ? myprofile.introduce : ""}
        </Text>
        <SocialUrl snsUrl={myprofile?.snsUrl} />
      </Wrap>

      <Grid gtc="auto auto auto" cg="20px" margin="10px 0">
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

      <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 10px">
        {current === "판매목록" && (
          <NoInfo list={myPost} text="아직 등록한 작품이 없어요.">
            {myPost &&
              current === "판매목록" &&
              myPost.map((post) => {
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
          <NoInfo list={myReview} text="아직 등록한 작품이 없어요.">
            {myReview &&
              current === "리뷰목록" &&
              myReview.map((post) => {
                return (
                  <ArtCard
                    review
                    key={`${post.postId}_myReview`}
                    className="sell"
                    {...post}
                    onClick={() => history.push(`/review/view/${post.postId}`)}
                  />
                );
              })}
          </NoInfo>
        )}

        {current === "관심목록" && (
          <NoInfo list={myMarkup} text="아직 등록한 작품이 없어요.">
            {myMarkup &&
              current === "관심목록" &&
              myMarkup.map((post) => {
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
    </>
  );
};

const CurrentDiv = styled.div`
  font-weight: bold;
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  /* animation: all 3s ease-out; */
  border-bottom: ${({ current, theme }) =>
    current ? `3px solid ${theme.color.brandColor}` : "3px solid transparent;"};
  &:focus {
    /* outline: none; */
  }
  // 모바일 파란박스 없애기
  -webkit-tap-highlight-color: transparent;
`;

const Nav = styled.div`
  display: grid;
  width: 100%;
`;

const Follower = styled.span`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

export default UserProfile;
