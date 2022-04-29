import React, { useEffect, useState } from "react";
import { ArtCard, Card } from "../components";
import Category from "../components/Category";
import { Checkbox, Flex, Grid, Input, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getPostDB, go2detail } from "../redux/modules/stores";
import { history } from "../redux/configureStore";

import { AiOutlineSearch } from "react-icons/ai";

const Store = () => {
  const dispatch = useDispatch();
  const storeList = useSelector((state) => state.store.list);

  // 검색창 인풋
  const [input, setInput] = useState("");

  useEffect(() => {
    // 더미데이터 주입된상태
    dispatch(getPostDB());
  }, []);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/${data.postId}`);
  };

  return (
    <>
      <Grid>
        <Input
          margin="0 20px"
          placeholder="작가명, 작품명 검색..."
          icon={<AiOutlineSearch size={28} />}
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          {storeList.map((l) => {
            return (
              <ArtCard
                key={l.postId}
                {...l}
                onClick={() => handleClickData(l)}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Store;
