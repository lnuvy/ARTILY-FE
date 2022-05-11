import React, { useEffect, useState } from "react";
import { Button, Text, Flex, Image, Grid, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getmyPageDB, getDetail, selectList } from "../redux/modules/mypage";
import { go2detail } from "../redux/modules/store";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard } from "../components";
import theme from "../styles/theme";
import { getUserInfo, userLogout } from "../redux/modules/user";
import { removeToken } from "../shared/token";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const MyPage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mystore.list);
  const nowList = useSelector((state) => state.mystore.nowList);

  const getProfile = useSelector((state) => state.user.user);

  // 웹사이트 주소 외부링크 연결
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      dispatch(getmyPageDB(user?.userId)); //게시글 정보
      dispatch(getUserInfo()); //유저정보
    }
  }, []);

  const handleClickSellData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/${data.postId}`);
  };
  const handleClickReviewData = (data) => {
    dispatch(go2detail(data));
    history.push(`/review/${data.reviewId}`);
  };
  const handleClickMarkupData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/${data.postId}`);
  };

  const [current, setCurrent] = useState(menus[0]);

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
          margin="0 10px"
          fg="1"
          width="100px"
          height="100px"
          bg="#ddd"
          br="50px"
          src={
            getProfile && getProfile.profileImage ? getProfile.profileImage : ""
          }
        ></Image>
        <Wrap padding="0 20px 0 0px">
          <Text h2 bold margin="5px 0 10px 0">
            {getProfile && getProfile.nickname ? getProfile.nickname : ""}
            {/* 유저명 */}
          </Text>
          <Text body2>
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
          <Text body2>
            등록한 작품 {mystoreList.myPost && mystoreList.myPost.length}개
          </Text>
        </Wrap>
        <Wrap margin="0 0 50px">
          {/* 본인의 마이페이지인 경우에만 수정하기 버튼이 보여야 함 */}
          <Edit
            onClick={() => {
              history.push("/mypage/edit");
            }}
          >
            <Text>수정하기</Text>
          </Edit>
        </Wrap>
      </Flex>

      <Text margin="10px 10px">
        {getProfile && getProfile.introduce ? getProfile.introduce : ""}
        {/* 자기소개 영역입니다아아아아자기소개 영역입니다아아아아자기소개
        영역입니다아아아아자기소개 영역입니다아아아아자기소개
        영역입니다아아아아자기소개 영역입니다아아아아자기소개 영역입니다아아아아 */}
      </Text>
      {/* 누르면 저장해둔 웹사이트 링크로 이동 */}
      <Wrap>
        <Flex width="100%" margin="5px 0 10px 20px">
          <Text className="site" fg="1">
            {/* 유저에게 받은 웹사이트 주소 넣어서 외부링크로 연결해야 함. 아직 못함 */}
            {/* <a href={`${getProfile.snsUrl[0]}`}>❤️ instagram</a> */}
            <a href="google.com" target="_blank" rel="noreferrer">
              ❤️ instagram
            </a>
          </Text>
          <Text className="site" fg="1">
            <a href="naver.com" target="_blank" rel="noreferrer">
              💙 Behance
            </a>
          </Text>
          <Text className="site" fg="1">
            <a href={``}>🌐 Website</a>
          </Text>
        </Flex>
      </Wrap>
      <Mytab>
        <p
          onClick={() => {
            history.push("/mypage/manage");
          }}
        >
          판매 작품 등록 / 관리
        </p>
        <p
          onClick={() => {
            history.push("/mypage/buyList");
          }}
        >
          구매 내역 조회 / 리뷰 작성
        </p>
        <p
          onClick={() => {
            console.log("로그아웃!");
            removeToken();
            userLogout();
          }}
        >
          로그아웃
        </p>
      </Mytab>

      {/* 임시 버튼 */}
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </Button>
      <Button
        onClick={() => {
          history.push("/profile");
        }}
      >
        최초 로그인시 프로필 설정
      </Button>
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
        {mystoreList &&
          nowList?.map((l) => {
            if (current === "리뷰목록") {
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
            } else
              return (
                <ArtCard
                  sellLabel
                  key={`${l.postId}_mypost`}
                  className="sell"
                  {...l}
                  onClick={() => handleClickSellData(l)}
                />
              );
          })}
      </Grid>
    </>
  );
};

const Mytab = styled.div`
  .mytab {
    width: 100%;
    height: 10vh;
    padding-left: 1em;
    cursor: pointer;
  }
  p {
    border-bottom: 1px solid #ddd;
    padding: 1.2em 0.5em;
    cursor: pointer;
  }
  p:nth-of-type(1) {
    border-top: 1px solid #ddd;
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
