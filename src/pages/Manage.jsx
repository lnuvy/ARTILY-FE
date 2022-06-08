import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../elements";
import { getDetail, getMySellListDB } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { ArtCard } from "../components";
import theme from "../styles/theme";
import { NoInfo } from "../components";
const Manage = () => {
  const dispatch = useDispatch();
  const mystoreList = useSelector((state) => state.mypage.sellList);
  useEffect(() => {
    dispatch(getMySellListDB());
  }, []);
  const handleClickData = (data) => {
    dispatch(getDetail(data));
    history.push(`/store/view/${data.postId}`);
  };

  return (
    <>
      <Inner>
        <Text h2 bold margin="8px 0 13px 16px">
          판매 작품 관리하기
        </Text>

        <Grid gtc="auto" rg="8px" cg="8px" margin="10px 0 20px 0">
          <NoInfo list={mystoreList} text1="판매중인 작품이 없습니다.">
            {mystoreList?.map((list) => {
              return (
                <ArtCard
                  mystore
                  key={list.postId}
                  postId={list.postId}
                  className="sell"
                  {...list}
                  onClick={() => handleClickData(list)}
                />
              );
            })}{" "}
          </NoInfo>
        </Grid>

        <Sellbtn>
          <Button
            shadow
            width="100%"
            onClick={() => {
              history.push("/store/write");
            }}
          >
            판매 작품 등록하기
          </Button>
        </Sellbtn>
      </Inner>
    </>
  );
};

const Inner = styled.div`
  background-color: #fff;

  position: relative;
  padding-bottom: 60px;
`;

const Sellbtn = styled.div`
  position: fixed;
  bottom: 0;
  max-width: ${theme.view.maxWidth};
  width: 100%;
  padding: 16px;
`;
export default Manage;
