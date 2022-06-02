import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, Wrap } from "../elements";
import { Card, Footer, ReviewCard, StoreCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import theme from "../styles/theme";
import banner from "../assets/images/banner.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  const { bestPost, bestWriter, bestReview } = useSelector(
    (state) => state.main
  );

  const move2detail = (data, path) => {
    if (path === "store") {
      history.push(`/${path}/view/${data.postId}`);
      return;
    }
    if (path === "review") {
      history.push(`/${path}/view/${data.reviewId}`);
    }
  };
  const MySwal = withReactContent(Swal);
  const howScroll = () => {
    MySwal.fire({
      icon: "info",
      text: "PC에서도 [shift] + 마우스 휠을 움직여 좌우 스크롤이 가능해요!",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      }
    });
  };

  return (
    <>
      <Image height="220px" width="100%" br="0" border="none" src={banner} />
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
        <Text bold h3 margin="0 0 10px 16px">
          아틀리가 주목하는 작가
        </Text>
        <div className="info" onClick={howScroll}>
          i
        </div>
        <BestArtistWrap className="WrapSlide">
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
                    width="270px"
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
  margin: 0 16px 28px 16px;
  overflow: auto;
  overflow-y: hidden;
`;

const WrapNotice = styled.div`
  position: relative;
  .info {
    position: absolute;
    top: 0;
    right: 16px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid #777;
    text-align: center;
    color: #777;
    line-height: 16px;
    cursor: pointer;
  }
`;
