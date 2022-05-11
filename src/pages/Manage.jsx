//판매작품 등록/관리하기 페이지
//마이페이지 판매목록과 동일한 목록
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Grid, Text, Flex } from "../elements";
import { useLocation } from "react-router-dom";
import { getmyPageDB, getDetail, selectList } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";
const menus = ["판매목록"];

const Manage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mystore.list);
  console.log(mystoreList);
  const nowList = useSelector((state) => state.mystore.nowList);

  const nowUser = useSelector((state) => state.user.user);

  //더미 데이터 주입
  useEffect(() => {
    dispatch(getmyPageDB(nowUser?.userId));
  }, []);

  const handleClickData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/${data.postId}`);
  };

  const [current, setCurrent] = useState(menus[0]);

  useEffect(() => {
    dispatch(selectList(current));
  }, [current]);
  return (
    <>
      <Text h2 bold margin="0 0 0 10px">
        판매 작품 관리하기
      </Text>

      {/* 판매목록 */}
      <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0">
        {mystoreList &&
          nowList?.map((list) => {
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

      <Button
        width="90%"
        margin="10px auto"
        onClick={() => {
          history.push("/store/write");
        }}
      >
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
