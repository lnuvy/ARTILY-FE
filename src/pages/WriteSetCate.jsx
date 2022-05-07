import React from "react";
import { CategoryRadio } from "../components";
import { Grid, Text } from "../elements";

const WriteSetCate = () => {
  return (
    <Grid>
      <Text h1 bold>
        카테고리 선택
      </Text>
      <CategoryRadio />
    </Grid>
  );
};

export default WriteSetCate;
