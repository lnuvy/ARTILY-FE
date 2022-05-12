import React, { useEffect, useState } from "react";
import { Button, Text, Flex, Image, Grid, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getmyPageDB, getDetail, selectList } from "../redux/modules/mypage";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard } from "../components";
import theme from "../styles/theme";
import { getUserInfo, userLogout } from "../redux/modules/user";
import { removeToken } from "../shared/token";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const MyPage = () => {
  const dispatch = useDispatch();
  const myAllList = useSelector((state) => state.mystore.list);
  const nowList = useSelector((state) => state.mystore.nowList);

  const getProfile = useSelector((state) => state.user.user);
  useEffect(() => {
    if (isLogin) {
      dispatch(getUserInfo());
      dispatch(getmyPageDB(user?.userId)); //게시글 정보
    }
  }, [dispatch]);
  // 웹사이트 주소 외부링크 연결
  const user = useSelector((state) => state.user.user);

  console.log(user?.snsUrl);
  const target = {
    Url: user?.snsUrl,
  };

  let insta,
    behance,
    other = null;

  insta =
    target?.Url?.find((url) => {
      return url.includes("instagram");
    }) || null;
  behance =
    target?.Url?.find((url) => {
      return url.includes("behance");
    }) || null;

  // other = target.Url[2] || null;

  //프로필 정보 불러오기
  const isLogin = useSelector((state) => state.user.isLogin);
  const userId = useSelector((state) => state.user?.user?.userId);
  console.log("서버로 보낼 userId :", userId);

  //userId가 본인일 경우에만 수정하기 버튼 나오게
  const storeUserId = useSelector((state) => state.store?.list[0]?.user.userId); //게시글 아무거나 선택해서 userId 비교해
  console.log(storeUserId);

  const is_me = userId === storeUserId ? true : false;

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
    history.push(`/store/${data.postId}`);
  };

  const [current, setCurrent] = useState(menus[0]);

  useEffect(() => {
    dispatch(selectList(current));
  }, [myAllList]);
  useEffect(() => {
    dispatch(selectList(current));
  }, [current]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setCurrent(menus.find((l) => l === innerText));
  };

  return (
    <>
      <Flex>
        <Image
          margin="1em 1em"
          fg="1"
          width="90px"
          height="90px"
          bg="#ddd"
          br="45px"
          border="1px solid #ddd"
          src={
            getProfile && getProfile.profileImage ? getProfile.profileImage : ""
          }
        ></Image>
        <Wrap padding="0 30px 0 0">
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
            등록한 작품 {myAllList.myPost && myAllList?.myPost.length}개
          </Text>
        </Wrap>
        <Wrap margin="0 0 50px">
          {/* 본인의 마이페이지인 경우에만 수정하기 버튼이 보여야 함 */}
          {/* {is_me || ( */}
          <Edit
            onClick={() => {
              history.push("/mypage/edit");
            }}
          >
            <Text margin="0 0 15px 0">수정하기</Text>
          </Edit>
          {/* )} */}
        </Wrap>
      </Flex>

      <Text body1 color="#555" margin="0.5em 1em">
        {getProfile && getProfile.introduce ? getProfile.introduce : ""}
      </Text>
      {/* 누르면 저장해둔 웹사이트 링크로 이동 */}
      <Flex width="100%" jc="space-between" padding="0.5em 1em">
        <Flex>
          {insta && <img src="/images/instagram.svg" alt="인스타" />}
          <Text className="site" margin="0 0 0 5px">
            {insta && (
              <a href={insta} target="_blank" rel="noreferrer">
                instagram
              </a>
            )}
          </Text>
        </Flex>
        <Flex>
          {behance && <img src="/images/Behance.svg" alt="비핸스" />}

          <Text className="site" margin="0 0 0 5px">
            {behance && (
              <a href={behance} target="_blank" rel="noreferrer">
                Behance
              </a>
            )}
          </Text>
        </Flex>
        <Flex>
          <img src="/images/web.svg" alt="포트폴리오" />

          <Text className="site" margin="0 0 0 5px">
            <a href={other} target="_blank" rel="noreferrer">
              <p>Website</p>
            </a>
          </Text>
        </Flex>
      </Flex>
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
      {/*--------------------------------------------------------------*/}
      <Grid gtc="auto auto auto" cg="20px" margin="10px 0">
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

      {/* ---------------------------------------------------- */}
      <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="10px 10px 20px">
        {myAllList &&
          nowList?.map((l) => {
            console.log(l);
            if (current === "판매목록") {
              return (
                <ArtCard
                  sellLabel
                  key={`${l.postId}_mypost`}
                  className="sell"
                  {...l}
                  onClick={() => handleClickSellData(l)}
                />
              );
            } else if (current === "리뷰목록") {
              return (
                <ArtCard
                  review
                  key={`${l.postId}_review`}
                  className="sell"
                  {...l}
                  onClick={() => handleClickReviewData(l)}
                />
              );
            } else if (current === "관심목록") {
              return (
                <ArtCard
                  markup
                  key={`${l.postId}_markup`}
                  className="sell"
                  {...l}
                  onClick={() => handleClickMarkupData(l)}
                />
              );
            }
          })}
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
      right: 16px;
    }
  }
  p:nth-of-type(1) {
    border-top: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  }

  .logout {
    /* border-bottom: ${({ theme }) => `1px solid ${theme.pallete.gray1}`}; */
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
