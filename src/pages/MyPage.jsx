import React, { useEffect, useState } from "react";
import { Button, Text, Flex, Image, Grid, Wrap } from "../elements";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getmyPostDB, go2detail } from "../redux/modules/mypage";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { ArtCard, Card } from "../components";

const choicemenu = {
  판매목록: "/mypage",
  리뷰목록: "/mypage",
  관심목록: "/mypage",
};

export const menus = Object.entries(choicemenu);

const MyPage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mystore.list);
  console.log(mystoreList);
  const getProfileInfo = useSelector((state) => state.user.user);
  console.log(getProfileInfo);
  //더미 데이터 주입
  useEffect(() => {
    dispatch(getmyPostDB());
  }, [dispatch]);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/view/${data.postId}`);
  };
  // 현재 url 경로로 홈에있는지, 스토어에있는지, 리뷰에 있는지 판별
  const path = useLocation().pathname;
  const [current, setCurrent] = useState(menus[0]); // ["홈", "/home"] 이렇게 저장됨

  // 경로가 바뀔때마다 url이 포함하고있는 네비게이션 항목으로 설정
  useEffect(() => {
    const now = menus.find((l) => path.includes(l[1]));
    if (now) {
      setCurrent(now);
    }
  }, [path]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setCurrent(menus.find((l) => l[0] === innerText));
  };
  return (
    <>
      <Flex>
        <Image
          fg="1"
          width="100px"
          height="100px"
          bg="#ddd"
          br="50px"
          src=""
        ></Image>
        <Wrap>
          <Text bold>유저명</Text>
          <Text>팔로우 2명 · 팔로워 7명</Text>
          <Text>등록한 작품 5개</Text>
        </Wrap>
        <Wrap margin="0 0 50px 0">
          <Text>수정하기</Text>
        </Wrap>
      </Flex>

      <Text>자기소개 영역입니다아아아아</Text>
      <Flex>
        <Text bold>✉ 문의 </Text>
        <Text>klk17625@naver.com</Text>
      </Flex>
      <Flex>
        <Text>❤️ instagram</Text>
        <Text>💙 Behance</Text>
        <Text>🌐 Website</Text>
      </Flex>
      <Mytab>
        <div className="mytab">
          <Text
            bold
            onClick={() => {
              history.push("/store/write");
            }}
          >
            판매 작품 등록 / 관리
          </Text>
        </div>
        <div className="mytab">
          <Text bold>구매 내역 조회 / 리뷰 작성</Text>
        </div>
        <div className="mytab">
          <Text bold>로그아웃</Text>
        </div>
      </Mytab>

      <Grid gtc="auto auto auto" cg="20px" margin="10px 0">
        {menus.map((menu) => {
          return (
            <CurrentDiv
              key={menu}
              onClick={(e) => {
                handleChangeCurrent(e);
                history.push(menu[1]);
              }}
              current={menu === current}
            >
              <Nav>{menu[0]}</Nav>
            </CurrentDiv>
          );
        })}
      </Grid>
      {/* ---------------------------------------------------- */}
      {/* 판매목록 */}
      <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
        {mystoreList.map((l) => {
          return (
            //판매중 or 판매완료를 표시해야 하는데 어떻게 해야할까
            <SellList key={l.postId}>
              <ArtCard
                className="sell"
                {...l}
                onClick={() => handleClickData(l)}
              />
            </SellList>
          );
        })}
      </Grid>
    </>
  );
};

const Mytab = styled.div`
  .mytab {
    color: #ddd;
    width: 100%;
    height: 10vh;
    border-top: 1px solid #ddd;
    padding-left: 1em;
    cursor: pointer;
    //line-height가 안먹는다..일단 임시로 padding-top 설정
    padding-top: 20px;
  }
  .mytab:nth-of-type(3) {
    border-bottom: 1px solid #ddd;
  }
`;

const CurrentDiv = styled.div`
  font-weight: bold;
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  /* animation: all 3s ease-out; */
  border-bottom: ${({ current }) =>
    current ? `3px solid #ddd;` : "3px solid transparent;"};
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

const SellList = styled.div`
  .sell {
  }
`;
export default MyPage;
