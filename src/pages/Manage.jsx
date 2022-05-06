import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Grid, Text, Flex } from "../elements";
import { useLocation } from "react-router-dom";
import { getmyPostDB, go2detail } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";

const sellState = {
  판매중: "/mypage/manage",
  판매완료: "/mypage/manage",
};

export const menus = Object.entries(sellState);

const Manage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mystore.list);
  console.log(mystoreList);
  //더미 데이터 주입
  useEffect(() => {
    dispatch(getmyPostDB());
  }, [dispatch]);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/mypage/manage/${data.postId}`);
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
      <Text h2 bold margin="0 0 0 10px">
        판매 작품 관리하기
      </Text>

      <Grid gtc="auto auto">
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

      {/* 판매목록 */}
      <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0">
        {mystoreList.map((list) => {
          //판매글이 없다면?
          if (!list) {
            return (
              <p>
                아직 등록한 작품이 없어요.
                <br />
                작품을 등록하시겠어요?
              </p>
            );
          }
          return (
            //판매중 or 판매완료를 표시해야 하는데 어떻게 해야할까
            <ArtCard
              mystore
              key={list.postId}
              className="sell"
              {...list}
              onClick={() => handleClickData(list)}
            ></ArtCard>
          );
        })}
      </Grid>

      <Button width="90%" margin="10px auto">
        판매 작품 등록하기
      </Button>
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
// const Sell = styled.div`
//   margin: 10px 0;
//   border-top: 1px solid #ddd;
//   border-bottom: 1px solid #ddd;
//   height: 50px;
//   p {
//     border-right: 1px solid #ddd;
//     /* width: 33%; */
//     /* text-align: center; */
//     height: 50px;
//     line-height: 50px;
//     font-weight: bold;
//     cursor: pointer;
//   }
//   p:nth-of-type(1),
//   p:nth-of-type(2) {
//     padding: 0 1em;
//   }
//   //판매완료로 변경 버튼 전체영역이 눌렸으면 좋겠는데 아직 해결 못함
//   p:nth-of-type(3) {
//     border-right: none;
//     margin: auto;
//   }
// `;
export default Manage;
