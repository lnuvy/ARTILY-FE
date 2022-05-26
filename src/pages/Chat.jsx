import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard, NoInfo } from "../components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import {
  getChatList,
  getChatMessages,
  getNowChatInfo,
  receiveChat,
  receiveChatRoom,
} from "../redux/modules/chat";
import Loader from "../shared/Loader";
import { socket } from "../shared/socket";
import theme from "../styles/theme";
import styled from "styled-components";

const Chat = () => {
  const dispatch = useDispatch();
  const { chatData } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChatList());

    socket.on("join_room", (data) => {
      console.log("join_room socketOn:  ", data);
      dispatch(receiveChatRoom(data));
      socket.emit("enter_room", data.roomName); //내가 보내는거
      //키값이 서버와 동일해야 실행됨
      //서버는 socket.on(받는거)
    });

    socket.on("receive_message", (data) => {
      dispatch(receiveChat(data));
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
    };
  }, []);

  const enterRoom = async (roomName) => {
    dispatch(getNowChatInfo(roomName));
    await dispatch(getChatMessages(roomName));
  };

  return (
    <>
      <Suspense fallback={Loader}>
        <Grid>
          <NoInfo
            list={chatData?.chatRoom}
            text1="아직 대화중인 사람이 없어요!"
          >
            {chatData?.chatRoom?.map((room, i) => {
              return (
                <CardWrap>
                  <ChatCard
                    key={room.roomName}
                    room={room}
                    onClick={() => enterRoom(room.roomName)}
                  />
                </CardWrap>
              );
            })}
          </NoInfo>
        </Grid>
      </Suspense>
    </>
  );
};

export default Chat;

const CardWrap = styled.div`
  color: red;
  border-bottom: 1px solid ${theme.pallete.gray1};
`;
