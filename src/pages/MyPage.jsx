import React, { useEffect, useState } from "react";
import { Text, Flex, Image, Grid, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getmyPageDB, getDetail } from "../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard, NoInfo, SocialUrl } from "../components";
import theme from "../styles/theme";
import { getUserInfo, userLogout } from "../redux/modules/user";
import { removeToken } from "../shared/token";
import { compose } from "redux";
import { getFollowDB, getFollowerDB } from "../redux/modules/follow";
import { socket } from "../shared/socket";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const MyPage = () => {
  const dispatch = useDispatch();

  const getProfile = useSelector((state) => state.user.user);
  // 웹사이트 주소 외부링크 연결
  const myAllList = useSelector((state) => state.mypage.list);
  console.log(myAllList);

  // 팔로워 목록 불러오기 위해 사용함
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getmyPageDB()); //게시글 정보
  }, []);

  const {
    myMarkups = null,
    myPosts = null,
    myReviews = null,
    // myprofile = null,
  } = myAllList;

  // const handleClickSellData = (data) => {
  //   dispatch(getDetail(data));
  //   history.push(`/store/view/${data.postId}`);
  // };
  // const handleClickReviewData = (data) => {
  //   dispatch(getDetail(data));
  //   history.push(`/review/${data.reviewId}`);
  // };
  // const handleClickMarkupData = (data) => {
  //   dispatch(getDetail(data));
  //   history.push(`/store/view/${data.postId}`);
  // };

  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(innerText);
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
              shadow="1px 1px 2px #ddd"
              border="1px solid #eee"
              src={
                getProfile && getProfile.profileImage
                  ? getProfile.profileImage
                  : ""
              }
            />
            <Wrap margin="0 16px 0 16px">
              <Text h3 bold margin="0 0 10px 0">
                {getProfile && getProfile.nickname ? getProfile.nickname : ""}
                {/* 유저명 */}
              </Text>
              <Grid
                onClick={() => {
                  history.push("/follow");
                  // dispatch(saveFollowDB());
                }}
              >
                <Text body2 color="#555">
                  팔로워{" "}
                  <Follower>
                    {getProfile?.followerCnt ? getProfile?.followerCnt : "0"}
                  </Follower>
                  명 · 팔로잉{" "}
                  <Follower>
                    {getProfile?.followCnt ? getProfile?.followCnt : "0"}
                  </Follower>
                  명
                </Text>
              </Grid>
              <Text body2 color="#555" margin="0.5em 0 0 0">
                등록한 작품{" "}
                {myAllList.myPosts && myAllList?.myPosts.length
                  ? myAllList?.myPosts.length
                  : "0"}
                개
              </Text>
            </Wrap>
          </Flex>
          {/* 본인의 마이페이지일 경우에만 수정가능. 아직 구현중 */}
          <Wrap margin="0 0 45px">
            <Edit
              onClick={() => {
                history.push("/mypage/edit");
              }}
            >
              <Text margin="0 0 15px 0">수정하기</Text>
            </Edit>
          </Wrap>
        </Flex>

        <Text body1 color="#555" margin="0.5em 0">
          {getProfile && getProfile.introduce ? getProfile.introduce : ""}
        </Text>
        <SocialUrl snsUrl={getProfile?.snsUrl || null} />
      </Wrap>
      <Mytab>
        <Flex
          className="top"
          onClick={() => {
            history.push("/mypage/manage");
          }}
        >
          <p className="sell">
            판매 작품 등록하기 / 관리하기
            <img
              src="../../images/Vector.svg"
              alt="vector"
              className="vector"
            />
          </p>
        </Flex>
        <Flex
          onClick={() => {
            history.push("/review/write/select");
          }}
        >
          <p>
            구매 내역 조회하기 / 리뷰 쓰기
            <img
              src="../../images/Vector.svg"
              alt="vector"
              className="vector"
            />
          </p>
        </Flex>
        <Flex
          onClick={() => {
            removeToken();
            dispatch(userLogout());
            socket.disconnect();
          }}
        >
          <p className="logout">
            로그아웃
            <img
              src="../../images/Vector.svg"
              alt="vector"
              className="vector"
            />
          </p>
        </Flex>
      </Mytab>

      <Grid gtc="auto auto auto" cg="20px" margin="0 0 10px 0">
        {menus.map((menu) => {
          return (
            <CurrentDiv
              key={menu}
              onClick={(e) => {
                handleChangeCurrent(e);
              }}
              current={menu === current}
            >
              <Nav>{menu}</Nav>
            </CurrentDiv>
          );
        })}
      </Grid>

      {current === "판매목록" && (
        <NoInfo
          list={myPosts}
          text1="아직 등록한 작품이 없어요"
          text2="작품을 등록하시겠어요?"
          button="작품 등록"
          movePage="/store/write"
        >
          <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 10px">
            {myPosts &&
              current === "판매목록" &&
              myPosts.map((post) => {
                console.log(post);
                return (
                  <ArtCard
                    sellLabel
                    key={`${post.postId}_mypost`}
                    className="sell"
                    {...post}
                    // userInfo={myprofile}
                    onClick={() => history.push(`/store/view/${post.postId}`)}
                  />
                );
              })}
          </Grid>
        </NoInfo>
      )}

      {current === "리뷰목록" && (
        <NoInfo
          list={myReviews}
          text1="아직 작성한 후기가 없어요"
          text2="후기를 작성하시겠어요?"
          button="후기 작성"
          movePage="" //후기 작성페이지로 이동
        >
          <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 10px">
            {myReviews &&
              current === "리뷰목록" &&
              myReviews.map((review) => {
                return (
                  <ArtCard
                    review
                    key={`${review.reviewId}_myReview`}
                    className="sell"
                    // userInfo={myprofile}
                    {...review}
                    onClick={() =>
                      history.push(`/review/view/${review.reviewId}`)
                    }
                  />
                );
              })}
          </Grid>
        </NoInfo>
      )}

      {current === "관심목록" && (
        <NoInfo
          list={myMarkups}
          text1="아직 관심있는 작품이 없어요"
          text2="작품을 구경해보시겠어요?"
          button="스토어로 이동"
          movePage="/store"
        >
          <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 10px">
            {myMarkups &&
              current === "관심목록" &&
              myMarkups.map((post) => {
                return (
                  <ArtCard
                    markup
                    key={`${post.postId}_myMarkup`}
                    className="sell"
                    // userInfo={myprofile}
                    {...post}
                    onClick={() => history.push(`/store/view/${post.postId}`)}
                  />
                );
              })}
          </Grid>
        </NoInfo>
      )}
    </>
  );
};

const Mytab = styled.div`
  p {
    padding: 1.2em 1em;
    cursor: pointer;
    flex-grow: 1;
    position: relative;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.41px;
    .vector {
      position: absolute;
      top: 23px;
      right: 25px;
    }
    border-top: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  }
  .sell {
    border-top: ${({ theme }) => `8px solid ${theme.pallete.gray1}`};
  }
  .logout {
    border-bottom: ${({ theme }) => `8px solid ${theme.pallete.gray1}`};
  }
`;

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

const Edit = styled.div`
  p {
    font-size: 15px;
    color: ${theme.color.brandColor};
  }
`;

const Follower = styled.span`
  font-weight: bold;
  cursor: pointer;
`;
export default MyPage;
