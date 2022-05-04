import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Flex, Grid, Input, Text, Wrap } from "../elements";
import { BsPaperclip } from "react-icons/bs";
import { socket } from "../shared/socket";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import theme from "../styles/theme";

const { color } = theme;

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  // 메세지 보내는사람 (지금은 무조건 작성자 본인)
  const from = useSelector((state) => state.user.user?.nickname);

  // useEffect(() => {
  //   // 여기서 대화내역 불러오기
  // }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      console.log("!!!!!!!!!!!!!!!");
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
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

  // 스크롤 부드럽게 내리기
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container>
      {messages.map((msg, i) => {
        if (msg.from === from)
          return (
            <Flex key={i} width="80%" jc="end">
              <Flex
                width="fit-content"
                padding="10px 20px"
                margin="15px 20px 5px"
                bc={color.brandColor}
                br="8px"
                jc="end"
              >
                <Text h1 color="white">
                  {msg.message}
                </Text>
              </Flex>
            </Flex>
          );
        else
          return (
            <Flex key={i} width="80%">
              <Flex
                width="fit-content"
                padding="10px 20px"
                margin="20px"
                bc={color.brandColor}
                br="8px"
                jc="start"
              >
                <Text>{msg.message}</Text>
              </Flex>
            </Flex>
          );
      })}
      <div ref={messagesEndRef} />

      <FixedChatBar>
        <Flex>
          <BsPaperclip size={30} />
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
        </Flex>
        <Button onClick={sendMessage}>전송</Button>
      </FixedChatBar>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 175px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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
  z-index: 20;
  background-color: white;
`;

export default ChatRoom;
