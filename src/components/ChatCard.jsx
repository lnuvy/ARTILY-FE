import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image, Text } from "../elements";
import { history } from "../redux/configureStore";

const ChatCard = ({ room }) => {
  // const dispatch = useDispatch();

  return (
    <Flex jc="space-between" margin="16px 24px">
      <Flex>
        <Image circle size={50} />

        <Flex fd="column" margin="0 12px" jc="flex-start">
          <Text h2>{room?.nickname || "닉네임"}</Text>
          <Text body2>{room?.lastMessage || "마지막대화"}</Text>
        </Flex>
      </Flex>
      <Flex fd="column">
        <Text body2>{room?.time || "몇분전"}</Text>
        <Text h2>{room?.noti || "알림"}</Text>
      </Flex>
    </Flex>
  );
};

export default ChatCard;
