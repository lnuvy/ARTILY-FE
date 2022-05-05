import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { notificationCheck } from "../redux/modules/chat";
import { socket } from "../shared/socket";

const Chat = () => {
  const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);

  useEffect(() => {
    // 방목록 가져오기
    // dispatch()
    // socket.on("join_room", (data) => {
    //   dispatch(receiveChatRoom(data));
    // });
  }, []);

  const enterRoom = (roomName) => {
    dispatch(notificationCheck(roomName));
    history.push(`/chat/${roomName}`);
  };

  return (
    <>
      <Grid>
        <ChatCard />
        <ChatCard />
        {roomList.map((room, i) => {
          return (
            <ChatCard
              key={room.roomName}
              room={room}
              onClick={() => enterRoom(room.roomName)}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Chat;
