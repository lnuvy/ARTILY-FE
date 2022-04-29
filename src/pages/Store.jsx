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
        <Flex>
          <Checkbox fg="1" id="nanum">
            나눔상품만 보기
          </Checkbox>
          <Text>거래 방식/지역 선택하기</Text>
          <Icon />
        </Flex>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
          {array.map((v, i) => {
            return (
              <ArtCard
                key={i}
                artist="작가명"
                title="제목"
                method="거래방식"
                region="지역"
                price="19000"
              />
            );
          })}
        </Grid>
      </Wrap>
    </React.Fragment>
  );
};

export default Store;
