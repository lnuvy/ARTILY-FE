import React, { useEffect } from "react";
import { Card } from "../components";
import Category from "../components/Category";
import { Checkbox, Flex, Grid, Input, Text } from "../elements";
import Container from "../elements/Container";
import { AiOutlineSearch } from "react-icons/ai";
const Store = () => {
  useEffect(() => {});

  return (
    <>
      <Grid>
        <Input
          margin="0 20px"
          placeholder="작가명, 작품명 검색..."
          icon={<AiOutlineSearch size={28} />}
        />
        <Category />
        <Flex padding="5px 10px" jc="space-between">
          <Flex>
            <Checkbox id="checkFree" zoom="1.5">
              <Text h2>나눔 작품만 보기</Text>
            </Checkbox>
          </Flex>
          <Text h2>거래 방식/지역 선택하기</Text>
        </Flex>
        <Grid gtc="auto auto">
          <Card>판매글1</Card>
          <Card>판매글2</Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Store;
