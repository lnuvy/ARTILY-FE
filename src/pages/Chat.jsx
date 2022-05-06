import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard, NoInfo } from "../components";
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
        <NoInfo list={roomList} text="아직 대화중인 사람이 없어요!">
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
