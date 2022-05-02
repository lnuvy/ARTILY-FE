import React from "react";
import { useDispatch } from "react-redux";
import { Flex, Image, Text } from "../elements";

const ChatCard = (props) => {
  // const dispatch = useDispatch();

  return (
    <Flex jc="space-between" margin="16px 24px" onClick={props.onClick || null}>
      <Flex>
        <Image circle size={50} />

        <Flex fd="column" margin="0 12px" jc="flex-start">
          <Text h2>{props?.nickname || "닉네임"}</Text>
          <Text body2>{props?.lastMessage || "마지막대화"}</Text>
        </Flex>
      </Flex>
      <Flex fd="column">
        <Text body2>{props?.time || "몇분전"}</Text>
        <Text h2>{props?.noti || "알림"}</Text>
      </Flex>
    </Flex>
  );
};

export default ChatCard;
