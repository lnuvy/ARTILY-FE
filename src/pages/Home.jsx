import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text, Grid, Image, Wrap } from "../elements";
import { Card, ArtCard, ReviewCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import { openModal } from "../redux/modules/modal";

const Home = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);

  //주소 정보가 없으면(=최초 로그인일 경우)
  // if (userInfo.address) {
  //   history.push("/regionset");
  // }

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, [dispatch]);

  // 한번에 데이터를 리덕스에 넣는방법이 딱히 안떠올라서 main용 리덕스를 새로 만들었습니다 좋은 의견있으면 바꿔주세요
  const { bestStore, recommendArtist, bestReview } = useSelector(
    (state) => state.main
  );

  const move2detail = (data, path) => {
    console.log(data, path);
    if (path === "/store") {
      console.log();
    }
    history.push(`${path}/${data.postId}`);
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
      <Image height="240px" />
      <Wrap margin="16px">
        <Text h2>인기작품</Text>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {bestStore.map((v, i) => {
            return (
              <ArtCard
                // path 까지 받아서 붙여넣는걸로했는데 더좋은방법이 있을거같네요 고민해봅시다 -한울-
                onClick={() => move2detail(v, "/store")}
                key={v.postId}
                {...v}
              />
            );
          })}
        </Grid>
        <Text h2>아트인이 주목하는 작가</Text>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {recommendArtist.map((v, i) => {
            return (
              <Card
                key={i}
                border="1px solid rgba(0,0,0,0.1)"
                padding="12px"
                onClick={modalOn}
              >
                <Image circle size="100" margin="8px auto 0" />
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
          {bestReview.length
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
