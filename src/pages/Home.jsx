import React, { useEffect } from "react";
import { Flex, Image, Text } from "../elements";
import Container from "../elements/Container";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Grid from "../elements/Grid";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Home = () => {
  return (
    <Container>
      <Flex height="30vh" bg="lightgray">
        플랫폼에 대한 소개영역
      </Flex>
      {/* 인기작품 */}
      {/* <Flex padding="0 10px" margin="15px 0 10px" fd="column"> */}
      <Flex jc="start" padding="0 10px" margin="15px 0 10px">
        <Text fontSize="20px" fontWeight="700">
          인기 작품
        </Text>
      </Flex>

      {/* 카드 컴포넌트 */}
      <Grid gtc="1fr 1fr" gap="5px">
        <Flex fd="column">
          <Flex
            width="180px"
            height="210px"
            bg="tomato"
            borderRadius="8px"
            onClick={() => history.push("/store/게시글상세")}
          >
            <Image shape="rectangle" />
          </Flex>
          <Flex padding="5px" fd="column">
            <Flex>
              <Image onClick={() => history.push("/store/특정유저아이디")} />
              &nbsp;&nbsp;
              <Text padding="0 5px" fontWeight="700">
                작가명
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight="600">작품명</Text>
            </Flex>
            <Flex>
              <Text>직거래 / 서울 관악구</Text>
            </Flex>
            <Flex jc="space-between">
              <Text>15,000원</Text>♡ 14
            </Flex>
          </Flex>
        </Flex>
      </Grid>

      {/* 아트인이 주목하는 작가 */}
      <Flex jc="start" padding="0 10px" margin="15px 0 10px" fd="column">
        <Flex jc="start">
          <Text fontSize="20px" fontWeight="700">
            아트인이 주목하는 작가
          </Text>
        </Flex>
      </Flex>
      <HorizontalDiv>
        <Grid gtr="3fr">
          <Grid onClick={() => history.push("/profile/아트인이주목")}>
            <Flex padding="10px">
              <Image size={80} />
            </Flex>
            <Text textAlign="center" fontWeight="700">
              작가명
            </Text>
            <Text textAlign="center">안녕하세요~</Text>
            <Flex>
              <Flex>
                <Image />
                <Text>Instagram</Text>
              </Flex>
              <Flex>
                <Image />
                <Text>Behance</Text>
              </Flex>
              <Flex>
                <Image />
                <Text>Personal</Text>
              </Flex>
            </Flex>
            <Text textAlign="center">작품타입 오브제, 등록작품 4개</Text>
          </Grid>
        </Grid>
      </HorizontalDiv>

      {/* Best 후기 */}
      <Flex jc="start" padding="0 10px" margin="15px 0 10px">
        <Text fontSize="20px" fontWeight="700">
          Best 후기
        </Text>
      </Flex>

      {/* 카드 컴포넌트 */}
      <Grid gtc="1fr 1fr" gap="5px">
        <Flex fd="column">
          <Flex
            width="180px"
            height="210px"
            bg="tomato"
            borderRadius="8px"
            onClick={() => history.push("/review/후기상세")}
          >
            <Image shape="rectangle" />
          </Flex>
          <Flex padding="5px" fd="column">
            <Flex jc="start">
              <Text padding="0 5px" fontWeight="700">
                후기 제목
              </Text>
            </Flex>
            <Flex fd="column">
              <Text>후기내용</Text>
              <Text>후기내용</Text>
            </Flex>
            <Flex></Flex>
            <Flex jc="space-between">
              <Flex>
                <Image />
                <Text>유저명</Text>
              </Flex>
              <Flex>♡ 14</Flex>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Container>
  );
};

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: gray;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;

export default Home;
