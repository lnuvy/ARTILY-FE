import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { changeTime } from "../shared/utils";

const ChatCard = ({ room, onClick }) => {
  // const dispatch = useDispatch();
  return (
    <Flex jc="space-between" margin="16px 24px" onClick={onClick}>
      <Flex>
        <Flex>
          <Image circle size={50} src={room?.profileImage} />
        </Flex>
        <Flex fd="column" padding="0 12px" margin="0 12px">
          <Flex>
            <Text h2>{room?.nickname || "닉네임"}</Text>
          </Flex>
          <Flex>
            <Text body2>
              {room?.lastMessage || "대화를 먼저 시작해보세요!"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex fd="column">
          <Text body2>
            {room?.lastTime ? changeTime(room?.lastTime) : null}
          </Text>
          <Text h2>{room?.newMessage || null}</Text>
        </Flex>
        <Flex>
          <Image width="50px" height="50px" src={room?.post?.imageUrl} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatCard;
