import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  Grid,
  Image,
  Wrap,
  Flex,
  ImageCarousel,
  ImageCarouselBanner,
} from "../elements";
import { Card, Footer, ReviewCard, StoreCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import theme from "../styles/theme";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";

const Home = () => {
  const dispatch = useDispatch();
  // const getProfile = useSelector((state) => state.user.user);

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  const { bestPost, bestWriter, bestReview } = useSelector(
    (state) => state.main
  );

  const move2detail = (data, path) => {
    // console.log(data, path);
    if (path === "store") {
      history.push(`/${path}/view/${data.postId}`);
      return;
    }
    if (path === "review") {
      history.push(`/${path}/view/${data.reviewId}`);
    }
  };

  const moveRightContents = () => {};
  const bannerImgs = [{ imageUrl: banner1 }, { imageUrl: banner2 }];
  return (
    <>
      <ImageCarouselBanner src={bannerImgs} />
      <Wrap padding="16px 16px 28px">
        <Text bold h3 margin="0 0 10px 0">
          인기 작품
        </Text>
        <Grid gtc="1fr 1fr" rg="16px" cg="7px">
          {bestPost &&
            bestPost.map((v, i) => {
              return (
                <StoreCard
                  onClick={() => move2detail(v, "store")}
                  isHome
                  key={v.postId}
                  {...v}
                  imageUrl={v.images[0].imageUrl}
                />
              );
            })}
        </Grid>
      </Wrap>
      <WrapNotice padding="0 0 24px">
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
                      {artist?.introduce || "-"}
                    </Text>
                    <Text body3 textAlign="center" color={theme.pallete.gray3}>
                      {/* 작품타입 오브제 ∙  */}
                      등록작품{" "}
                      {artist && artist.postCount ? artist.postCount : 0}개
                    </Text>
                  </Card>
                );
              })}
          </Grid>
        </BestArtistWrap>
      </WrapNotice>
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
                    onClick={() => move2detail(l, "review")}
                    images={l.images[0].imageUrl}
                  />
                );
              })
            : null}
        </Grid>
      </Wrap>
      <Footer />
    </>
  );
};
export default Home;

const BestArtistWrap = styled.div`
  /*padding으로 양 옆값 주면 오른쪽 여백이 반영이 안되는 것 같아서 margin으로 바꿨습니다.*/
  margin: 0 16px 24px 16px;
  overflow: auto;
  overflow-y: hidden;
`;
const WrapNotice = styled.div`
  position: relative;
`;
