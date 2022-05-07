import React, { useState } from "react";
import { Button, Flex, Grid, Text } from "../elements";
import styled from "styled-components";
import theme from "../styles/theme";

const cate = [
  "회화",
  "도자",
  "가구",
  "패션/주얼리",
  "사진/포스터",
  "조각",
  "기타",
];

const CategoryRadio = () => {
  const [current, setCurrent] = useState("회화");

  const divClickChange = (c) => {
    setCurrent(c);
  };

  const submitCategory = () => {
    console.log(current);
  };

  return (
    <>
      <Grid>
        <Text h1 bold>
          카테고리 선택
        </Text>
        <CategoryRadio />
      </Grid>
      <Grid rg="0">
        {cate.map((c, i) => {
          return (
            <Flex
              key={`${c}_type_idx${i}`}
              jc="space-between"
              // margin="0 20px"
              padding="10px 20px"
              onClick={() => divClickChange(c)}
              borderTop="1px solid gray"
            >
              <label htmlFor={c}>{c}</label>
              <Radio
                type="radio"
                value={c}
                checked={current === c}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </Flex>
          );
        })}
      </Grid>
      <Button width="90%" margin="40px auto 0">
        선택 완료
      </Button>
    </>
  );
};

const Radio = styled.input`
  appearance: none;
  outline: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  border: 1px solid gray;
  margin-right: 0.1rem;
  margin: 10px;
  background-color: white;

  // TODO: 보더 살리면서 안쪽 쪼끔만 색칠하기
  &[type="radio"]:checked {
    border: none;
    background-color: ${({ theme }) => theme.color.brandColor};
  }

  border-bottom: 1px solid gray;
`;

export default CategoryRadio;

// accent-color: ${({ theme }) => theme.color.brandColor};
// ${({ checked, theme }) =>
// checked ? `color: ${theme.color.brandColor};` : ""};