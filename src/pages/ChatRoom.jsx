import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Flex, Grid, Input, Wrap } from "../elements";
import { BsPaperclip } from "react-icons/bs";
import { socket } from "../shared/socket";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  // 메세지 보내는사람 (지금은 무조건 작성자 본인)
  const from = useSelector((state) => state.user.user?.nickname || "이한울");

  useEffect(() => {
    // 여기서 대화내역 불러오기
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        roomName,
        from,
        message,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      await socket.emit("send_message", messageData);
      setMessages((list) => [...list, messageData]);
      setMessage("");
    }
  };

  return (
    <Container>
      <Wrap padding="0 12px">
        {messages.map((msg, i) => {
          return <Grid key={i}>{msg.message}</Grid>;
        })}
      </Wrap>

      {/* 임시 */}
      <FixedChatBar>
        <Flex>
          <BsPaperclip size={30} />
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        </Flex>
        <Button onClick={sendMessage}>전송</Button>
      </FixedChatBar>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 84px);
`;

const FixedChatBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 12px;
  border-top: 1px solid gray;
`;

export default ChatRoom;
