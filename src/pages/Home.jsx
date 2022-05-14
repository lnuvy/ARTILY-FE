import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, Wrap } from "../elements";
import { Card, ReviewCard, StoreCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import theme from "../styles/theme";
import banner from "../assets/images/banner.png";

const Home = () => {
  const dispatch = useDispatch();
  // const getProfile = useSelector((state) => state.user.user);

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  // 한번에 데이터를 리덕스에 넣는방법이 딱히 안떠올라서 main용 리덕스를 새로 만들었습니다 좋은 의견있으면 바꿔주세요
  const { bestPost, bestWriter, bestReview } = useSelector(
    (state) => state.main
  );

  const move2detail = (data, path) => {
    console.log(data, path);
    if (path === "/store") {
      console.log();
    }
    history.push(`${path}/view/${data.postId}`);
  };

  return (
    <>
      <Image height="220px" width="100%" br="0" border="none" src={banner} />
      <Wrap padding="16px 16px 28px">
        <Text bold h3 margin="0 0 10px 0">
          인기 작품
        </Text>
        <Grid gtc="1fr 1fr" rg="16px" cg="16px">
          {bestPost.length > 0 &&
            bestPost.map((v, i) => {
              return (
                <StoreCard
                  onClick={() => move2detail(v, "/store")}
                  key={v.postId}
                  {...v}
                />
              );
            })}
        </Grid>
      </Wrap>
      <Wrap padding="0 0 24px">
        <Text bold h3 margin="0 0 18px 16px">
          아틀리가 주목하는 작가
        </Text>

        <BestArtistWrap>
          <Grid gtc="1fr 1fr 1fr 1fr" rg="8px" cg="8px">
            {bestWriter.length > 0 &&
              bestWriter.map((artist, i) => {
                return (
                  <Card
                    key={i}
                    border={`1px solid ${theme.pallete.gray1}`}
                    padding="16px 16px 10px"
                    onClick={() =>
                      history.push(`/userprofile/${artist?.userId}`)
                    }
                    width="268px"
                  >
                    <Image
                      circle
                      size="88"
                      margin="8px auto 10px"
                      src={artist?.profileImage}
                    />
                    <Text textAlign="center" margin="0 0 9px">
                      {artist?.nickname}
                    </Text>
                    <Text body2 textAlign="center" margin="0 0 6px">
                      {artist?.introduce}
                    </Text>
                    <Text body3 textAlign="center" color={theme.pallete.gray3}>
                      {/* 작품타입 오브제 ∙  */}
                      등록작품{" "}
                      {artist?.myPost?.length + artist?.myReview?.length}개
                    </Text>
                  </Card>
                );
              })}
          </Grid>
        </BestArtistWrap>
      </Wrap>
      <Wrap padding="0 16px 33px">
        <Text bold h3 margin="0 0 10px 0">
          Best 후기
        </Text>
        <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 0 20px">
          {bestReview.length > 0
            ? bestReview.map((l, i) => {
                return (
                  <ReviewCard
                    key={i}
                    {...l}
                    onClick={() => move2detail(l, "/review")}
                    imageUrl={l.imageUrl[0]}
                  />
                );
              })
            : null}
        </Grid>
      </Wrap>
    </>
  );
};
export default Home;

const BestArtistWrap = styled.div`
  padding: 0 16px;
  overflow: auto;
  overflow-y: hidden;
`;
