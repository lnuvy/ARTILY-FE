import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Text } from "../elements";
import { categoryList } from "../redux/modules/store";

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

const Category = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("전체");

  useEffect(() => {
    dispatch(categoryList(current));
  }, [current]);

  return (
    <Grid
      gtc="1fr 1fr 1fr 1fr"
      cg="1px"
      rg="1px"
      textAlign="center"
      bc="gray"
      border="1px solid gray"
    >
      {cate.map((c, i) => {
        if (c === current) {
          return (
            <Button
              key={`${c}_${i}`}
              padding="10px 5px"
              width="100%"
              br="0"
              onClick={(e) => setCurrent(e.target.innerText)}
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
              onClick={(e) => setCurrent(e.target.innerText)}
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
