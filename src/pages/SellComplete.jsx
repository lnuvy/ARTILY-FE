import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileCard } from "../components";
import { Button, Flex, Text, Wrap } from "../elements";
import theme from "../styles/theme";

const SellComplete = () => {
  const { roomList, userConnection } = useSelector((state) => state.chat);
  const { postId } = useParams();

  const [currentSelect, setCurrentSelect] = useState(0);

  const arr = new Array(3);

  console.log(arr);

  console.log(postId, currentSelect);
  return (
    <>
      <Wrap bc="#E0E0E0" height="calc(100vh - 48px)">
        <Flex bc="white">
          <Text h2 bold margin="8px 0 13px 16px">
            작품을 구매한 분은 누구인가요?
          </Text>
        </Flex>
        <ProfileCard current={currentSelect === 0} />
        <ProfileCard current={currentSelect === 1} />
        <ProfileCard current={currentSelect === 2} />
        {/* {arr.map((l, i) => {
          return (
            <ProfileCard
              key={Math.random().toString(12)}
              current={currentSelect === i}
              onClick={setCurrentSelect(i)}
            />
          );
        })} */}
        <Sellbtn>
          <Button
            shadow
            width="100%"
            onClick={() => {
              console.log("선택완료");
            }}
          >
            선택완료
          </Button>
        </Sellbtn>
      </Wrap>
    </>
  );
};

const Sellbtn = styled.div`
  position: fixed;
  /* bottom: 50px; */
  bottom: 0;
  max-width: ${theme.view.maxWidth};
  width: 100%;
  padding: 16px;
`;

export default SellComplete;
