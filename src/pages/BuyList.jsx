//마이페이지 => 구매 내역 조회 / 리뷰 작성 눌렀을때 나오는 페이지
import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Wrap } from "../elements";
import { getmyPageDB, getDetail } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { myPageDummy } from "../shared/Dummy";
import { ArtCard } from "../components";

// 5.17 가상데이터 넣어놨습니다
const BuyList = () => {
  const dispatch = useDispatch();
  const mybuyList = useSelector((state) => state.mypage.list);
  console.log(mybuyList);
  const dummybuyList = myPageDummy.myBuy;
  // const nowUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getmyPageDB());
  }, []);

  const handleClickData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/${data.postId}`);
  };

  // useEffect(() => {
  //   dispatch(selectbuyList());
  // }, []);
  return (
    <>
      <Text h2 bold margin="0 0 20px 14px">
        내가 구입한 상품
      </Text>
      {/* 구매목록 */}
      <Background>
        <Inner>
          <Wrap>
            {mybuyList &&
              dummybuyList?.map((list) => {
                return (
                  <ArtCard
                    buylist
                    key={list.postId}
                    className="sell"
                    {...list}
                    onClick={() => handleClickData(list)}
                  ></ArtCard>
                );
              })}
          </Wrap>
        </Inner>
        <Wrap textAlign="center" height="100%" padding="30px 0 0 0">
          <Text body2>구매한 작품이 없으신가요?</Text>
          <Text body3 textDeco="underline">
            판매자에게 판매 확정을 요청하기
          </Text>
        </Wrap>
      </Background>
    </>
  );
};

const Background = styled.div`
  background-color: #ddd;
  height: 100vh;
  overflow: hidden;
`;
const Inner = styled.div`
  background-color: #fff;
`;
export default BuyList;
