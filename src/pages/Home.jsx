import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { Flex, Icon, Text, Tab, Grid, Image, Wrap } from "../elements/index";
import { Card, Navigation, ArtCard } from "../components/index";
import { getHomeDataDB } from "../redux/modules/main";

const Home = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);

  const { bestStore, recommendArtist, bestReview } = useSelector(
    (state) => state.main
  );

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  return (
    <React.Fragment>
      <Image height="240px" />
      <Wrap margin="16px">
        <Text h2>인기작품</Text>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {bestStore.map((v, i) => {
            return <ArtCard key={v.postId} {...v} />;
          })}
        </Grid>
        <Text h2>아트인이 주목하는 작가</Text>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {recommendArtist.map((v, i) => {
            return (
              <Card key={i} border="1px solid rgba(0,0,0,0.1)" padding="12px">
                <Image shape="circle" size="100" margin="8px auto 0" />
                <Text textAlign="center">작가명</Text>
                <Text body2 textAlign="center">
                  작가 본인이 작성한 소개를 보여주는 영역입니다. 작가 본인이
                  작성한 소개를 보여주는 영역입니다.
                </Text>
                <Text body3 textAlign="center">
                  작품타입 오브제 ∙ 등록작품 4개
                </Text>
              </Card>
            );
          })}
        </Grid>
        <Text h2>Best 후기</Text>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {bestReview.map((v, i) => {
            return (
              <Card key={`${v}_${i}`}>
                <Image height="120px" />
                <Text>후기명</Text>
                <Text>
                  후기 내용 후기 내용 후기 내용 후기 내용 후기 내용 후기 내용{" "}
                </Text>
                <Flex margin="8px 0 0 0">
                  <Image shape="circle" size="20" />
                  <Text margin="0 0 0 4px">유저명</Text>
                </Flex>
              </Card>
            );
          })}
        </Grid>
      </Wrap>
    </React.Fragment>
  );
};

export default Home;
