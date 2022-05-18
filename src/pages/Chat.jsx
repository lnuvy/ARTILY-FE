import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard, NoInfo } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import {
  getChatList,
  notificationCheck,
  receiveChatRoom,
} from "../redux/modules/chat";
import { socket } from "../shared/socket";
import theme from "../styles/theme";

const Chat = () => {
  const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);

  useEffect(() => {
    // 방목록 가져오기
    dispatch(getChatList());
    socket.on("join_room", (data) => {
      dispatch(receiveChatRoom(data));
    });
  }, []);

  const enterRoom = (roomName) => {
    dispatch(notificationCheck(roomName));
    history.push(`/chat/${roomName}`);
  };

  return (
    <>
      <Grid border={`1px solid ${theme.pallete.gray1}`}>
        <NoInfo list={roomList} text1="아직 대화중인 사람이 없어요!">
          {roomList.map((room, i) => {
            return (
              <ChatCard
                key={room.roomName}
                room={room}
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
