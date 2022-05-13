import React from "react";
import { Grid, Image, Text } from "../elements";

// 당장 리스트의 내용이 없지만 채워질 가능성이 있을때 사용하면 좋을듯
const NoInfo = ({ list, text, children }) => {
  if (list && list.length > 0) return <>{children}</>;
  return (
    <Grid>
      {/* 해당 내용이랑 어울리는 디자인 이미지 */}
      {/* <Image /> */}
      <Text>{text}</Text>
    </Grid>
  );
};

export default NoInfo;
