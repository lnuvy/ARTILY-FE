import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Image, Text } from "../../elements";
import styled from "styled-components";

// import { topFive } from "../../shared/Dummy";
import CateBox from "../CateBox";
import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import LikeIcon from "../LikeIcon";

const Carousel = (props) => {
  const { topList } = props || [];

  // if (topList.length)
  // topList.sort((a, b) => b?.userLike?.length - a?.userLike?.length);

  // react-slick 설정
  const settings = {
    dots: true, // 하단 점
    infinite: true, // 슬라이드 반복
    speed: 500, // 페이지 넘기는 속도
    autoplay: true, // 페이지 자동이동
    autoplaySpeed: 2000, // 스크롤 넘어가는 속도
    slidesToShow: 5, // 한페이지에 보이는 객체 수
    slidesToScroll: 1, // 스크롤 넘어가는 객체 수
    arrows: false, // 양옆의 애로우 없애기
    // centerMode: true,
    centerPadding: "0",
    responsive: [
      // 반응형 설정
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

  const topFiveUI = topList.map((item, i) => {
    return (
      <Grid
        key={item.postId}
        bg="white"
        margin="0px auto"
        padding="10px"
        width="20%"
      >
        <Grid padding="0 16px 16px" _cursor>
          <Image
            _onClick={() => {
              history.push(`/list/${item.category}/${item.postId}`);
            }}
            src={item.imageUrl}
          />
        </Grid>
        <Grid isFlex_center>
          <Text size="20px" weight={600} margin="0">
            {item.itemName}
          </Text>
          <Text color="#636e72" weight={500} margin="0">
            &nbsp;&nbsp;{item.userNickname} ({item.userAge})
          </Text>
        </Grid>
        <Grid isFlex>
          <Grid flexColumn>
            <Grid isFlex_center>
              <LikeIcon post={item} />
            </Grid>
          </Grid>
          <CateBox nowCategory={item.category} _onClick={handleClick} />
        </Grid>
      </Grid>
    );
  });

  if (topList.length !== 5) {
    return (
      <Text center weight="500">
        게시글이 충분하지않아요!
      </Text>
    );
  }
  return (
    <Container>
      <Grid>
        <StyledSlider {...settings}>{topFiveUI}</StyledSlider>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  border-radius: 3px;
  padding: 30px;
`;

const StyledSlider = styled(Slider)`
  /* .slick-track {
    margin: 0;
    padding: 0;
  } */
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
    width: 100%;
  }
`;

export default Carousel;
