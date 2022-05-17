import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Grid from "./Grid";
import Image from "./Image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = (props) => {
  const { src } = props || [];

  // react-slick 설정
  const settings = {
    dots: true, // 하단 점
    infinite: false, // 슬라이드 반복
    autoplay: false, // 페이지 자동이동
    slidesToShow: 1,
    slidesToScroll: 1, // 스크롤 넘어가는 객체 수
    arrows: false, // 양옆의 애로우 없애기
  };

  return (
    <>
      <StyledSlider {...settings}>
        {src?.length > 0
          ? src.map((img, i) => {
              return (
                <Grid key={`${i}_번째_${img}`}>
                  <Image height="375px" src={img} alt="img" />
                </Grid>
              );
            })
          : null}
      </StyledSlider>
    </>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
    width: 100%;
  }

  // 점을 이미지 안에 넣기
  .slick-dots {
    bottom: 5px;

    // 점 간격 좁히기
    li {
      margin: 0;
    }
  }
`;

export default ImageCarousel;
