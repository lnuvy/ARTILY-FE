import React, { useCallback, useEffect, useState } from "react";
import { ArtCard, Card } from "../components";
import Category from "../components/Category";
import { Button, Checkbox, Flex, Grid, Input, Text, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getPostDB, go2detail, filteringData } from "../redux/modules/store";
import { history } from "../redux/configureStore";
import _ from "lodash";

import { AiOutlineSearch } from "react-icons/ai";
import { openModal } from "../redux/modules/modal";
import StoreFilter from "../shared/modal/modalContent/StoreFilter";

const Store = () => {
  const dispatch = useDispatch();

  // 카테고리 필터링
  const filterList = useSelector((state) => state.store.filterList);

  useEffect(() => {
    // 더미데이터 주입된상태
    dispatch(getPostDB());
  }, []);

  // 모달 필터링
  const [filtering, setFiltering] = useState({
    transaction: "전체",
    region: ["전체"],
  });

  // 검색창 인풋
  const [query, setQuery] = useState("");
  // 체크박스 체크될때 데이터 필터링
  const [isFree, setIsFree] = useState(false);

  let searchList = [];

  // 디바운스
  const debounce = _.debounce((k) => {
    searchList = filterList
      .filter((l) => {
        const address = l.user.address;
        const title = l.postTitle;
        const artist = l.user.nickname;
        const q = debounce;

        return title.includes(q) || artist.includes(q) || address.includes(q);
      })
      .map((l) => {
        return (
          <ArtCard key={l.postId} {...l} onClick={() => handleClickData(l)} />
        );
      });
  }, 1000);
  const keyPress = useCallback(debounce, []);

  const checkFree = (e) => {
    const { checked } = e.target;

    // 체크박스 체크되고 freeList가 빈배열일때 필터
    if (checked) {
      setIsFree(true);
    } else {
      setIsFree(false);
    }
  };

  const queryChange = (e) => {
    const { value } = e.target;
    keyPress(value);
    setQuery(value);
  };

  console.log(query, keyPress);

  // 필터링 모달 켜기
  const modalOn = () => {
    dispatch(
      openModal({
        title: "",
        // text 를 content 로 변경, 태그 직접 넣으면 됩니다
        content: (
          <StoreFilter filtering={filtering} setFiltering={setFiltering} />
        ),
      })
    );
  };

  // 상세페이지 이동
  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/view/${data.postId}`);
  };

  return (
    <>
      <Grid>
        <Input
          margin="0 20px"
          placeholder="작가명, 작품명 검색..."
          icon={<AiOutlineSearch size={28} />}
          value={query}
          onChange={queryChange}
        />
        <Category />
        <Wrap margin="16px">
          <Flex margin="0 0 10px" jc="space-between">
            <Checkbox
              id="checkFree"
              zoom={1.3}
              margin="0 10px"
              onChange={checkFree}
            >
              <Text h3>나눔 작품만 보기</Text>
            </Checkbox>
            <Flex onClick={modalOn}>
              <Text h3>거래 방식/지역 선택하기</Text>
            </Flex>
          </Flex>
          <Flex>
            {filtering.transaction !== "전체" && (
              <Text>{filtering.transaction}</Text>
            )}
            {filtering.region[0] !== "전체" &&
              filtering.region.map((r, i) => {
                return <Text key={`${i}_filter_${r}`}>{r}</Text>;
              })}
          </Flex>
          <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 0 20px">
            {searchList && query !== ""
              ? searchList
              : filterList.map((l) => {
                  if (isFree) {
                    if (l.price === 0) {
                      return (
                        <ArtCard
                          key={l.postId}
                          {...l}
                          onClick={() => handleClickData(l)}
                        />
                      );
                    }
                  } else
                    return (
                      <ArtCard
                        key={l.postId}
                        {...l}
                        onClick={() => handleClickData(l)}
                      />
                    );
                })}
          </Grid>
        </Wrap>
      </Grid>

      {/* 임시로 만들어둔 글쓰기 버튼 */}
      <Button onClick={() => history.push("/store/write")}>글쓰기</Button>
    </>
  );
};

export default Store;
