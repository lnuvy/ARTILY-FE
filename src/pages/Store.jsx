import React, { useCallback, useEffect, useState } from "react";
import { ArtCard, Card, Footer } from "../components";
import Category from "../components/Category";
import { Button, Checkbox, Flex, Grid, Input, Text, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getPostDB, go2detail, filteringData } from "../redux/modules/store";
import { history } from "../redux/configureStore";
import _ from "lodash";

import { openModal } from "../redux/modules/modal";
import StoreFilter from "../shared/modal/modalContent/StoreFilter";
import { FilterFilled, FilterOutline, Search } from "../assets/icons";
import theme from "../styles/theme";

const Store = () => {
  const dispatch = useDispatch();
  const { list, filterList } = useSelector((state) => state.store);
  // 카테고리 필터링

  console.log(filterList);

  useEffect(() => {
    // store api 두번요청되는걸 막기위함
    if (list.length < 6) dispatch(getPostDB());
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

  const checkFree = (e) => {
    const { checked } = e.target;

    // 체크박스 체크되고 freeList가 빈배열일때 필터
    if (checked) {
      setIsFree(true);
    } else {
      setIsFree(false);
    }
  };

  // 검색필터
  const searchList = filterList
    ?.filter((l) => {
      const address = l?.user?.address || "";
      const title = l?.postTitle;
      const artist = l?.user?.nickname;
      const q = query;

      if (title && artist) {
        return title.includes(q) || artist.includes(q) || address.includes(q);
      }
    })
    .map((l) => {
      return (
        <ArtCard key={l.postId} {...l} onClick={() => handleClickData(l)} />
      );
    });

  // 필터링 모달 켜기
  const modalOn = () => {
    dispatch(
      openModal({
        title: "",
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
      <Category />
      <Wrap margin="16px 16px 24px 16px">
        <Input
          square
          br="8px"
          padding="11px 16px"
          margin="0 0 16px"
          placeholder="작가명, 작품명 검색..."
          icon={<Search />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Flex margin="0 0 10px" jc="space-between">
          <Checkbox id="checkFree" zoom={1.3} onChange={checkFree}>
            <Text h3>나눔 작품만 보기</Text>
          </Checkbox>
          <Flex onClick={modalOn} jc="center" ai="center">
            <Text h3>거래 방식/지역 선택하기</Text>
            {filtering.transaction === "전체" &&
            filtering.region[0] === "전체" ? (
              <FilterFilled fill="gray" />
            ) : (
              <FilterFilled fill="black" />
            )}
          </Flex>
        </Flex>
        <Flex margin="5px 0 15px">
          {filtering.transaction !== "전체" && (
            <Text color={theme.pallete.gray3}>
              {filtering.transaction},&nbsp;
            </Text>
          )}
          {filtering.region[0] !== "전체" &&
            filtering.region.map((r, i, arr) => {
              if (i + 1 === arr.length) {
                return (
                  <Text key={`${i}_filter_${r}`} color={theme.pallete.gray3}>
                    {r}&nbsp;
                  </Text>
                );
              } else {
                return (
                  <Text key={`${i}_filter_${r}`} color={theme.pallete.gray3}>
                    {r},&nbsp;
                  </Text>
                );
              }
            })}
        </Flex>
        <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0">
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
      <Footer />
    </>
  );
};

export default Store;
