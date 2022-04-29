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

  useEffect(() => {
    // 더미데이터 주입된상태
    dispatch(getPostDB());
  }, []);

  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/${data.postId}`);
  };

  // 검색창 인풋
  const [input, setInput] = useState("");

  // 체크박스 체크될때 데이터 필터링
  const [freeList, setFreeList] = useState([]);

  const checkFree = (e) => {
    const { checked } = e.target;

    // 체크박스 체크되고 freeList가 빈배열일때 필터
    if (checked) {
      setFreeList(storeList.filter((l) => l.price === 0));
    } else {
      setFreeList([]);
    }
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
          <Checkbox
            id="checkFree"
            zoom={1.3}
            margin="0 10px"
            onChange={checkFree}
          >
            <Text h2>나눔 작품만 보기</Text>
          </Checkbox>
          <Text h2 margin="0 10px 0 0">
            거래 방식/지역 선택하기
          </Text>
        </Flex>
        <Grid gtc="auto auto">
          {freeList.length
            ? freeList.map((l) => {
                console.log(l);
                return (
                  <ArtCard
                    key={l.postId}
                    {...l}
                    onClick={() => handleClickData(l)}
                  />
                );
              })
            : storeList.map((l) => {
                console.log(l);
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
