import React, { useEffect, useState } from "react";
import { Button, Text, Flex, Image, Grid, Wrap } from "../elements";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getmyPostDB, go2detail, selectList } from "../redux/modules/mypage";
import { actionCreators as userActions } from "../redux/modules/user";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard } from "../components";
import theme from "../styles/theme";
import { getToken, insertToken, removeToken } from "../shared/token";

const menus = ["판매목록", "리뷰목록", "관심목록"];

const MyPage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mystore.list);
  const nowList = useSelector((state) => state.mystore.nowList);
  console.log(mystoreList);
  const getProfile = useSelector((state) => state.user.user);
  console.log(getProfile);

  //더미 데이터 주입
  useEffect(() => {
    dispatch(getmyPostDB());
  }, []);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/mypage/mystore/${data.postId}`);
  };

  const [current, setCurrent] = useState(menus[0]);

  useEffect(() => {
    console.log("지금 커런트", current);
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
          src=""
        ></Image>
        <Wrap padding="0 20px 0 0px">
          <Text h2 bold margin="0 0 5px 0">
            {/* {getProfile.nickname} */}
          </Text>
          <Text>팔로우 2명 · 팔로워 7명</Text>
          <Text>등록한 작품 5개</Text>
        </Wrap>
        <Wrap margin="0 0 50px">
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
        자기소개 영역입니다아아아아자기소개 영역입니다아아아아자기소개
        영역입니다아아아아자기소개 영역입니다아아아아자기소개
        영역입니다아아아아자기소개 영역입니다아아아아자기소개 영역입니다아아아아
      </Text>
      {/* 누르면 저장해둔 웹사이트 링크로 이동 */}
      <Website>
        <Flex margin="15px">
          <Text className="site" fg="1">
            <a href="http://www.instagram.com/yeong_k0825">❤️ instagram</a>
          </Text>
          <Text className="site" fg="1">
            💙 Behance
          </Text>
          <Text className="site" fg="1">
            🌐 Website
          </Text>
        </Flex>
      </Website>
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
        // onClick={kakaologOut}
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
      <Grid gtc="auto auto" rg="8px" cg="8px" margin="10px 10px 20px">
        {mystoreList &&
          nowList?.map((l) => {
            if (current === "리뷰목록") {
              return (
                <ArtCard
                  key={l.postId}
                  className="sell"
                  {...l}
                  onClick={() => handleClickData(l)}
                />
              );
            } else
              return (
                //판매중 or 판매완료를 표시해야 하는데 어떻게 해야할까
                <ArtCard
                  sellLabel
                  key={l.postId}
                  className="sell"
                  {...l}
                  onClick={() => handleClickData(l)}
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
const Website = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
`;
export default MyPage;
