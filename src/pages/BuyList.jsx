//마이페이지 => 구매 내역 조회 / 리뷰 작성 눌렀을때 나오는 페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Grid, Text, Flex } from "../elements";
import { useLocation } from "react-router-dom";
import { getmybuyDB, go2detail } from "../redux/modules/buy";
import { history } from "../redux/configureStore";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";

const BuyList = () => {
  const dispatch = useDispatch();
  const mybuyList = useSelector((state) => state.buylist.list);
  console.log(mybuyList);
  //더미 데이터 주입
  useEffect(() => {
    dispatch(getmybuyDB());
  }, [dispatch]);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/mypage/buylist/${data.postId}`);
  };

  return (
    <>
      <Text h2 bold margin="0 0 0 10px">
        구매 내역
      </Text>

      {/* 구매목록 */}
      <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0">
        {mybuyList.map((list) => {
          //구매글이 없다면?
          if (!list) {
            return (
              <>
                <p>
                  아직 구매 내역이 없어요.
                  <br />
                  작품을 구경하러 가볼까요?
                </p>
                <Button width="90%" margin="auto">
                  작품 구경하러 가기
                </Button>
              </>
            );
          }
          return (
            //판매중 or 판매완료를 표시해야 하는데 어떻게 해야할까
            <ArtCard
              buylist
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

export default BuyList;
