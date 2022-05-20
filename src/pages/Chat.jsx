import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard, NoInfo } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import {
  getChatList,
  getChatMessages,
  notificationCheck,
  receiveChatRoom,
} from "../redux/modules/chat";
import { socket } from "../shared/socket";
import theme from "../styles/theme";

const Chat = () => {
  const dispatch = useDispatch();
  const { roomData } = useSelector((state) => state.chat);

  useEffect(() => {
    socket.on("join_room", (data) => {
      console.log("join_room socketOn:  ", data);
      // TODO : 채팅방 생성당한사람 데이터 확인하기
      // dispatch(receiveChatRoom(data));
    });
  }, []);

  const enterRoom = (roomName) => {
    dispatch(getChatMessages());
    // dispatch(notificationCheck(roomName));
    history.push(`/chat/${roomName}`);
  };

  return (
    <>
      <Grid border={`1px solid ${theme.pallete.gray1}`}>
        <NoInfo list={roomData} text1="아직 대화중인 사람이 없어요!">
          {roomData.map((room, i) => {
            return (
              <ChatCard
                key={room.roomName}
                room={roomData}
                onClick={() => enterRoom(room.roomName)}
              />
            );
          })}
        </NoInfo>
      </Grid>
    </>
  );
};

export default Chat;
