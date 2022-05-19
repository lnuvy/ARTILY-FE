import React from "react";
import { Text, Wrap } from "../elements";

const SaleComplete = () => {
  return (
    <>
      <Text h2 bold margin="8px 0 13px 16px">
        작품을 구매한 분은 누구인가요?
      </Text>
      <Wrap bc="#ddd" height="100vh">
        {/* 판매목록 */}
      </Wrap>
    </>
  );
};

export default SaleComplete;
