import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { receiveChatRoom } from "../redux/modules/chat";
import { socket } from "../shared/socket";

const Chat = () => {
  const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);

  useEffect(() => {
    console.log("여기");
    socket.on("new_room", (data) => {
      console.log(data);
      dispatch(receiveChatRoom(data));
    });
  }, [socket]);

  const enterRoom = () => {
    socket.on("join_room", (data) => {
      console.log(data);
    });
    history.push(`/chat/${roomList.roomName || "22224230442222423041111"}`);
  };

  return (
    <>
      <Grid>
        <ChatCard />
        <ChatCard />
        {/* {roomList.map((room, i) => {
          return <ChatCard key={room.roomName} room={room} />;
        })} */}
      </Grid>
    </>
  );
};

export default Chat;
