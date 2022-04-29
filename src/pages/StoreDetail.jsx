import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {
  Flex,
  Icon,
  Text,
  Tab,
  Grid,
  Image,
  Checkbox,
  Wrap,
} from "../elements/index";
import { Card, Navigation, ArtCard } from "../components/index";

const Store = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <React.Fragment>
      <Wrap margin="16px">
        <Text h1>타이틀</Text>
        <Flex margin="8px 0 0 0">
          <Image shape="circle" size="20" />
          <Text margin="0 0 0 4px">작가</Text>
        </Flex>
      </Wrap>
      <Image height="120px" />
      <Wrap margin="16px">
        <Flex>
          <Text body3 fg="1">
            분류
          </Text>
          <Text body3>회화</Text>
        </Flex>
        <Flex>
          <Text body3 fg="1">
            크기
          </Text>
          <Text body3>29.7 x 42cm</Text>
        </Flex>
        <Flex>
          <Text body3 fg="1">
            거래 방식
          </Text>
          <Text body3>택배</Text>
        </Flex>
        <Text>
          작품에 대한 설명이 들어가는 영역입니다. 작품에 대한 설명이 들어가는
          영역입니다. 작품에 대한 설명이 들어가는 영역입니다. 작품에 대한 설명이
          들어가는 영역입니다.{" "}
        </Text>
        <Flex margin="16px 0 0 ">
          <Text h2 lineHeight="22px">
            작가의 다른 작품
          </Text>
          <Text margin="0 0 0 8px" fg="1" lineHeight="22px">
            팔로우
          </Text>
          <Text lineHeight="22px">더보기</Text>
        </Flex>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {array.map((v, i) => {
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
      </Wrap>
    </React.Fragment>
  );
};

export default Store;
