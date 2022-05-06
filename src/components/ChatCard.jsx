import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Image, Text } from "../elements";
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
            {room?.lastMessage ? (
              room.lastMessage.length > 30 ? (
                room.lastMessage.substring(0, 29) + "..."
              ) : (
                room.lastMessage
              )
            ) : (
              <Text body2>대화를 먼저 시작해보세요!</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex fd="column" margin="0 4px">
          <Text body2>
            {room?.lastTime ? changeTime(room?.lastTime) : null}
          </Text>
          {room?.newMessage > 0 && (
            <Button width="16px" height="10px" padding="5px" margin="0 4px">
              <p style={{ fontSize: "8px", fontWeight: "bold" }}>
                {room?.newMessage || null}
              </p>
            </Button>
          )}
        </Flex>
        <Flex>
          <Image width="50px" height="50px" src={room?.post?.imageUrl} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatCard;
