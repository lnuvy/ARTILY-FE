import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Text, ToggleButton, Wrap } from "../../../elements";
import { closeModal } from "../../../redux/modules/modal";
import { modalFiltering } from "../../../redux/modules/store";

const transaction = ["전체", "직거래", "택배"];
const regions = [
  "전체",
  "서울",
  "경기",
  "인천",
  "경상북도",
  "경상남도",
  "부산",
  "대구",
  "충청북도",
  "충청남도",
  "울산",
  "대전",
  "전라북도",
  "전라남도",
  "광주",
  "세종",
  "강원도",
  "제주",
];

// 스토어 필터 모달
const StoreFilter = ({ filtering, setFiltering }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(
    filtering || {
      transaction: "전체",
      region: ["전체"],
    }
  );

  const toggleTransaction = (e) => {
    const { innerText } = e.target;
    setFilter((filters) => ({ ...filters, transaction: innerText }));
  };

  const toggleRegion = (e) => {
    const { innerText } = e.target;
    // 전체누르면 나머지 다 활성화 해제
    if (innerText === "전체") {
      setFilter((filters) => ({ ...filters, region: ["전체"] }));
      return;
    }
    // 유저가 방금 누른버튼이 이미 선택돼있는지 검사
    const isExist = filter.region.find((r) => innerText === r);
    let removeRegion = [];

    // 선택 해제할때 (주황버튼을 눌렀을때)
    if (isExist) {
      removeRegion = filter.region.filter((r) => innerText !== r);
      // 하나남은 주황버튼을 눌러서 배열의 길이가 0이 됐을때 "전체" 활성화하기
      if (removeRegion.length === 0) {
        setFilter((filters) => ({ ...filters, region: ["전체"] }));
        return;
      }
      setFilter((filters) => ({ ...filters, region: removeRegion }));
      // 선택할때 (흰버튼을 눌렀을때)
    } else {
      // 첫 선택일때 전체 활성화 끄기
      if (filter.region[0] === "전체") {
        setFilter((filters) => ({
          ...filters,
          region: [innerText],
        }));
        return;
      }
      // "전체" 를 제외하고 모든 지역을 눌렀을때
      if (filter.region.length === regions.length - 1) {
        setFilter((filters) => ({ ...filters, region: ["전체"] }));
      } else {
        // 누른 버튼의 지역 활성화
        setFilter((filters) => ({
          ...filters,
          region: [...filters.region, innerText],
        }));
      }
    }
  };

  const submitFilter = () => {
    setFiltering(filter);
    dispatch(closeModal());
    dispatch(modalFiltering(filter));
  };

  return (
    <>
      <Wrap padding="12px">
        <Text h2 bold>
          거래 유형
        </Text>
        {transaction.map((l, i) => {
          if (filter.transaction === l)
            return (
              <ToggleButton
                select
                onClick={toggleTransaction}
                key={`${l}_${i}`}
              >
                {l}
              </ToggleButton>
            );
          else
            return (
              <ToggleButton onClick={toggleTransaction} key={`${l}_${i}`}>
                {l}
              </ToggleButton>
            );
        })}
        <Text h2 bold>
          지역
        </Text>
        {regions.map((r, i) => {
          if (filter.region.find((find) => find === r))
            return (
              <ToggleButton select onClick={toggleRegion} key={`${r}_${i}`}>
                {r}
              </ToggleButton>
            );
          else
            return (
              <ToggleButton onClick={toggleRegion} key={`${r}_${i}`}>
                {r}
              </ToggleButton>
            );
        })}
        <Button width="100%" margin="12px 0" onClick={submitFilter}>
          이 조건으로 검색하기
        </Button>
      </Wrap>
    </>
  );
};

export default StoreFilter;
