import React, { useState } from "react";
import { Card } from ".";
import { Button, Grid, Text } from "../elements";

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
  const [current, setCurrent] = useState("전체");

  console.log(current);
  return (
    <Grid gtc="1fr 1fr 1fr 1fr" cg="1px" rg="1px" textAlign="center">
      {cate.map((c) => {
        return (
          <Button
            key={c}
            padding="10px 5px"
            width="100%"
            br="0"
            onClick={(e) => setCurrent(e.target.innerText)}
          >
            <Text h2 bold color="white">
              {c}
            </Text>
          </Button>
        );
      })}
    </Grid>
  );
};

export default Category;
