import React, { useEffect, useState } from "react";
import { Text, Flex, Image, Grid, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getmyPageDB, getDetail } from "../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard, NoInfo, SocialUrl } from "../components";
import theme from "../styles/theme";
import { userLogout } from "../redux/modules/user";
import { removeToken } from "../shared/token";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const MyPage = () => {
  const dispatch = useDispatch();

  const getProfile = useSelector((state) => state.user.user);
  // 웹사이트 주소 외부링크 연결
  const myAllList = useSelector((state) => state.mystore.list);

  useEffect(() => {
    if (getProfile) {
      dispatch(getmyPageDB(getProfile?.userId)); //게시글 정보
    }
  }, [getProfile]);

  const {
    myMarkup = null,
    myPost = null,
    myReview = null,
    myprofile = null,
  } = myAllList;

  const handleClickSellData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/view/${data.postId}`);
  };
  const handleClickReviewData = (data) => {
    dispatch(getDetail(data));
    history.push(`/review/${data.reviewId}`);
  };
  const handleClickMarkupData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/view/${data.postId}`);
  };

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
              <Text body2 color="#555">
                팔로워{" "}
                <Follower
                  onClick={() => {
                    history.push("/follow");
                  }}
                >
                  {getProfile?.followerCnt}
                </Follower>
                명 · 팔로잉{" "}
                <Follower
                  onClick={() => {
                    history.push("/follow");
                  }}
                >
                  {getProfile?.followCnt}
                </Follower>
                명
              </Text>
              <Text body2 color="#555" margin="0.5em 0 0 0">
                등록한 작품 {myAllList.myPost && myAllList?.myPost.length}개
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
          onClick={() => {
            history.push("/mypage/manage");
          }}
        >
          <p>
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
            history.push("/mypage/buyList");
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
            console.log("로그아웃!");
            removeToken();
            dispatch(userLogout());
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

      <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 10px">
        {current === "판매목록" && (
          <NoInfo list={myPost} text="아직 등록한 작품이 없어요.">
            {myPost &&
              current === "판매목록" &&
              myPost.map((post) => {
                console.log(post);
                return (
                  <ArtCard
                    sellLabel
                    key={`${post.postId}_mypost`}
                    className="sell"
                    {...post}
                    userInfo={myprofile}
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
              myReview.map((review) => {
                return (
                  <ArtCard
                    review
                    key={`${review.reviewId}_myReview`}
                    className="sell"
                    userInfo={myprofile}
                    {...review}
                    onClick={() =>
                      history.push(`/review/view/${review.postId}`)
                    }
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
                    userInfo={myprofile}
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
  }

  p {
    border-top: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  }
  .logout {
    border-bottom: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
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
  text-decoration: underline;
  cursor: pointer;
`;
export default MyPage;
