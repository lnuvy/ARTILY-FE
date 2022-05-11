import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text, Grid, Image, Wrap } from "../elements";
import { Card, ArtCard, ReviewCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import { openModal } from "../redux/modules/modal";
import { getToken } from "../shared/token";
import styled from "styled-components";
import theme from "../styles/theme";

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

  const modalOn = () => {
    dispatch(
      openModal({
        title: "모달제목",
        // text 를 content 로 변경, 태그 직접 넣으면 됩니다
        content: <Text body2>안녕안녕</Text>,
      })
    );
  };

  return (
    <>
      <Image height="200px" width="100%" br="0" border="none" />
      <Wrap padding="16px 16px 28px">
        <Text bold h3 margin="0 0 10px 0">
          인기 작품
        </Text>
        <Grid gtc="1fr 1fr" rg="16px" cg="16px">
          {bestPost.map((v, i) => {
            return (
              <ArtCard
                home
                onClick={() => move2detail(v, "/store")}
                key={i}
                {...v}
                nickname={v.user.nickname}
                profileImage={v.user.profileImage}
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
            {bestWriter.map((v, i) => {
              return (
                <Card
                  key={i}
                  border={`1px solid ${theme.pallete.gray1}`}
                  padding="16px 16px 10px"
                  onClick={modalOn}
                  width="268px"
                  height="215px"
                >
                  <Image
                    circle
                    size="88"
                    margin="8px auto 10px"
                    src={v.profileImage}
                  />
                  <Text textAlign="center" margin="0 0 9px">
                    {v.nickname}
                  </Text>
                  <Text body2 textAlign="center" margin="0 0 6px">
                    {v.introduce}
                  </Text>
                  <Text body3 textAlign="center" color={theme.pallete.gray3}>
                    작품타입 오브제 ∙ 등록작품 4개
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
          {bestReview.length
            ? bestReview.map((v, i) => {
                console.log(v);
                return (
                  <ReviewCard
                    key={i}
                    {...v}
                    onClick={() => move2detail(v, "/review")}
                    imageUrl={v.imageUrl[0]}
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
