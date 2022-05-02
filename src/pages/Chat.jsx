import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChatCard } from "../components";
import { Grid } from "../elements";

const Chat = () => {
  const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);
  console.log(roomList, newMessage);

  return (
    <>
      <Grid>
        <ChatCard />
      </Grid>
    </>
  );
};

export default Chat;
