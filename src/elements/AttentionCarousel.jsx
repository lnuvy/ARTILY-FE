import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Grid from "./Grid";
import Image from "./Image";
import Text from "./Text";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { Card } from "../components";
import { useHistory } from "react-router-dom";
import theme from "../styles/theme";

//작업중인 파일입니다.
const AttentionCarousel = () => {
  const history = useHistory();

  const bestWriter = useSelector((state) => state.main.bestWriter);
  console.log(bestWriter);
  // react-slick 설정
  const settings = {
    dots: false, // 하단 점
    infinite: true, // 슬라이드 반복
    autoplay: true, // 페이지 자동이동
    slidesToShow: 1,
    slidesToScroll: 1, // 스크롤 넘어가는 객체 수
    arrows: true, // 양옆의 애로우 없애기
  };

  // console.log(src);

  return (
    <>
      <StyledSlider {...settings}>
        <WrapNotice padding="0 0 24px">
          <BestArtistWrap>
            <Grid gtc="1fr 1fr 1fr 1fr" rg="8px" cg="8px">
              {bestWriter.map((artist, i) => {
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
      </StyledSlider>{" "}
    </>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
    /* width: 100%; */
  }

  // 점을 이미지 안에 넣기
  .slick-dots {
    bottom: 11px;

    // 점 간격 좁히기
    li {
      margin: 0;
    }
  }
`;
const BestArtistWrap = styled.div`
  /*padding으로 양 옆값 주면 오른쪽 여백이 반영이 안되는 것 같아서 margin으로 바꿨습니다.*/
  width: 100vw;
  margin: 0 16px 24px 16px;
  overflow: auto;
  overflow-y: hidden;
`;
const WrapNotice = styled.div`
  position: relative;
`;
export default AttentionCarousel;
