import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// components
import theme from "../styles/theme";
import { Button, Grid, Text } from "../elements";
// modules
import { filteringData } from "../redux/modules/store";
import { filteringReviewData } from "../redux/modules/reviews";

const cate = [
  "전체",
  "회화",
  "도자",
  "가구",
  "패션/주얼리",
  "사진/포스터",
  "조각",
  "기타",
];

const Category = (props) => {
  const dispatch = useDispatch();

  const { review } = props;
  const [current, setCurrent] = useState("전체");
  useEffect(() => {
    review
      ? dispatch(filteringReviewData(current)) //리뷰
      : dispatch(filteringData(current)); //스토어
  }, [current]);

  return (
    <Grid
      gtc="1fr 1fr 1fr 1fr"
      cg="1px"
      rg="1px"
      textAlign="center"
      width="100%"
      bc={`${theme.pallete.gray2}`}
      border={`1px solid ${theme.pallete.gray2}`}
    >
      {cate.map((c, i) => {
        if (c === current) {
          //클릭했을때
          return (
            <Button
              key={`${c}_${i}`}
              padding="10px 5px"
              width="100%"
              br="0"
              borderRight="1px solid black"
              onClick={(e) => {
                setCurrent(e.target.innerText);
              }}
              bc="white"
            >
              <Text body2 bold>
                {c}
              </Text>
            </Button>
          );
        } else {
          return (
            <Button
              key={`${c}_${i}`}
              padding="10px 5px"
              width="100%"
              br="0"
              borderRight="1px solid black"
              border={`1px solid ${theme.pallete.gray2}`}
              onClick={(e) => {
                setCurrent(e.target.innerText);
              }}
              bc="white"
            >
              <Text body2>{c}</Text>
            </Button>
          );
        }
      })}
    </Grid>
  );
};

export default Category;
