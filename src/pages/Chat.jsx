import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChatCard } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { socket } from "../shared/socket";

const Chat = () => {
  // const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);
  console.log(roomList, newMessage);

  useEffect(() => {
    // 현재 유저가 진행중인 채팅 불러오기
    // dispatch()
  }, []);

  const enterRoom = () => {
    socket.on("join_room", (data) => {
      console.log(data);
    });
    history.push(`/chat/${roomList.roomName || "22224230442222423041111"}`);
  };

  return (
    <>
      <Grid>
        <ChatCard onClick={enterRoom} />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </Grid>
    </>
  );
};

export default Chat;
