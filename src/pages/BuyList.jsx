//마이페이지 => 구매 내역 조회 / 리뷰 작성 눌렀을때 나오는 페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Grid, Text, Flex, Wrap } from "../elements";
import { useLocation } from "react-router-dom";
import {
  getmyPageDB,
  getDetail,
  selectList,
  // selectbuyList,
  // buyList,
} from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";
const menus = ["구매목록"];
const BuyList = () => {
  const dispatch = useDispatch();
  const mybuyList = useSelector((state) => state.mystore.list);
  console.log(mybuyList);
  const dummybuyList = useSelector((state) => state.mystore.nowList);
  console.log(dummybuyList);

  useEffect(() => {
    dispatch(getmyPageDB());
  }, [dispatch]);

  const handleClickData = (data) => {
    dispatch(getDetail(data));
    history.push(`/mypage/buylist/${data.postId}`);
  };
  const [current, setCurrent] = useState(menus[0]);
  useEffect(() => {
    dispatch(selectList(current));
  }, [current]);
  return (
    <>
      <Text h2 bold margin="10px 0 20px 10px">
        내가 구입한 상품
      </Text>
      {/* 구매목록 */}
      <Background>
        <Inner>
          <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0">
            {mybuyList &&
              dummybuyList?.map((list) => {
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
        </Inner>
        {/* 스크롤이 안생겼으면 하는데 방법이 있을까요? */}
        <Wrap textAlign="center" height="70vh" padding="30px 0 0 0">
          <Text body2>구매한 작품이 없으신가요?</Text>
          <Text body3 textDeco="underline">
            판매자에게 판매 확정을 요청하기
          </Text>
          {/* 현재 페이지에서 뒤로가기 버튼 누르면 에러나서 이유 찾는중.*/}
        </Wrap>
      </Background>
    </>
  );
};

const Background = styled.div`
  background-color: #ddd;
`;
const Inner = styled.div`
  background-color: #fff;
`;
const Border = styled.div`
  /* height: 40px; */
  border-bottom: 1px solid #ddd;
`;
export default BuyList;
