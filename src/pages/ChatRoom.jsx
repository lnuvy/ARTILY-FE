import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Flex, Grid, Image, Input, Text, Wrap } from "../elements";
import { socket } from "../shared/socket";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { history } from "../redux/configureStore";
import {
  messagesUpdate,
  notificationCheck,
  receiveChat,
} from "../redux/modules/chat";
import { ChatFileInput } from "../components";
import { clearPreview } from "../redux/modules/image";

const { color } = theme;

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  const from = useSelector((state) => state.user.user?.userId);
  // const target = JSON.parse(targetInfo)?.userId;

  console.log(from);

  const nowChat = useSelector((state) => state.chat.roomList).find(
    (room) => room.roomName === roomName
  );

  const [message, setMessage] = useState("");
  // 사진업로드
  const uploadFile = useSelector((state) => state.image.represent);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // socket.emit("join_room", roomName, nowChat?.post?.userId, nowChat?.post);
  // }, [socket]);

  useEffect(() => {
    if (nowChat) {
      setMessages(nowChat.messages);
    }
    return () => {
      dispatch(notificationCheck(roomName));
    };
  }, [nowChat]);

  const sendMessage = () => {
    // 공백검사
    if (/\S/.test(message) && !uploadFile) {
      const messageData = {
        roomName,
        from,
        message,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      socket.emit("send_message", messageData);
      // setMessages((list) => [...list, messageData]);
      setMessages(messages.concat(messageData));
      setMessage("");
      dispatch(receiveChat(messageData));

      socket.on("receive_message", (data) => {
        setMessages(messages.concat(data));
      });
    } else {
      alert("공백만 입력됨");
      setMessage("");
    }
  };

  const sendFile = () => {
    const file = uploadFile;
    const formData = new FormData();

    console.log(file);

    if (file) {
      formData.append("image", file);
    }

    console.log("formData", formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    socket.emit("send_message", formData);
    dispatch(clearPreview());
  };

  // 스크롤 부드럽게 내리기
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const leaveRoom = () => {
    socket.emit("leave_room", roomName);
  };

  useEffect(() => {
    socket.on("leave_room", (data) => {
      console.log(data);
    });
  });

  return (
    <>
      {/* 상품 정보 */}
      <Wrap>
        <Flex>
          <Image src={nowChat?.post?.imageUrl} width="50px" height="50px" />
          <Flex fd="column">
            <Text h1>{nowChat?.post?.postTitle}</Text>
            <Text h2>{nowChat?.post?.price}</Text>
          </Flex>
        </Flex>
        <Flex>
          <Button onClick={leaveRoom}>나가기</Button>
        </Flex>
      </Wrap>

      {/* 채팅 */}
      <Container>
        {messages.map((msg, i) => {
          if (msg.from === from)
            return (
              <Flex key={i} width="80%" jc="end" height="auto">
                <Text>{moment(msg.time).format("hh:mm")}</Text>
                <Flex
                  width="fit-content"
                  height="fit-content"
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
              <Flex key={i} width="80%" height="auto">
                <Image circle size={50} src={nowChat.profileImage} />
                <Flex
                  width="fit-content"
                  height="fit-content"
                  padding="10px 20px"
                  margin="20px"
                  bc={color.brandColor}
                  br="8px"
                  jc="start"
                >
                  <Text>{msg.message}</Text>
                </Flex>
                <Text>{moment(msg.time).format("hh:mm")}</Text>
              </Flex>
            );
        })}
        <div ref={messagesEndRef} />

        <FixedChatBar>
          <Flex>
            <ChatFileInput />
            {uploadFile ? (
              <Image width="60px" height="50px" src={uploadFile} />
            ) : (
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
            )}
          </Flex>
          {uploadFile ? (
            <Button onClick={sendFile}>전송</Button>
          ) : (
            <Button onClick={sendMessage}>전송</Button>
          )}
        </FixedChatBar>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - 275px);
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
