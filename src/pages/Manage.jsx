//판매작품 등록/관리하기 페이지
//마이페이지 판매목록과 동일한 목록
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Grid, Text, Flex, Wrap } from "../elements";
import { getDetail, getMySellListDB } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";

const Manage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mypage.sellList);
  console.log(mystoreList);

  const handleClickData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/view/${data.postId}`);
  };
  useEffect(() => {
    dispatch(getMySellListDB());
  }, []);
  return (
    <>
      <Text h2 bold margin="8px 0 13px 16px">
        판매 작품 관리하기
      </Text>
      <Background>
        {/* 판매목록 */}
        <Inner>
          <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0">
            {mystoreList?.map((list) => {
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
                  mypage
                  key={list.postId}
                  className="sell"
                  {...list}
                  onClick={() => handleClickData(list)}
                ></ArtCard>
              );
            })}
          </Grid>
        </Inner>
        <Sellbtn>
          <Wrap height="70vh">
            <Flex width="90%" margin="0 auto">
              <Button
                width="100%"
                onClick={() => {
                  history.push("/store/write");
                }}
              >
                판매 작품 등록하기
              </Button>
            </Flex>
          </Wrap>
        </Sellbtn>
      </Background>
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

const Background = styled.div`
  background-color: #ddd;
  height: 100%;
`;
const Inner = styled.div`
  background-color: #fff;
`;

const Sellbtn = styled.div``;
export default Manage;
