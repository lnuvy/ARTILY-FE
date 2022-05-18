import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Wrap,
  Icon,
} from "../elements";
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
import { ArrowUpward } from "../assets/icons";
import { priceComma } from "../shared/utils";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  const from = useSelector((state) => state.user.user?.userId);
  // const target = JSON.parse(targetInfo)?.userId;

  const nowChat = useSelector((state) => state.chat.roomList).find(
    (room) => room.roomName === roomName
  );
  console.log(nowChat);

  const isDone = nowChat?.post?.done;

  const [message, setMessage] = useState("");
  // 사진업로드
  const uploadFile = useSelector((state) => state.image.represent);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (nowChat) {
      setMessages(nowChat.messages);
      console.log(messages);
    }
    return () => {
      dispatch(notificationCheck(roomName));
    };
  }, [nowChat]);

  console.log(messages);

  const sendMessage = () => {
    // 공백검사
    if (/\S/.test(message) && !uploadFile) {
      const messageData = {
        from,
        message,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      socket.emit("send_message", messageData);
      console.log(messageData);
      console.log(messages);
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

  // const sendFile = () => {
  //   const file = uploadFile;
  //   const formData = new FormData();

  //   console.log(file);

  //   if (file) {
  //     formData.append("image", file);
  //   }

  //   console.log("formData", formData);
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }

  //   socket.emit("send_message", formData);
  //   dispatch(clearPreview());
  // };

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
      <Wrap padding="10px 16px">
        <Flex>
          {isDone ? (
            <ImageDark>
              <Image
                br="8px"
                src={nowChat?.post?.imageUrl}
                width="48px"
                height="48px"
              />
            </ImageDark>
          ) : (
            <Image
              br="8px"
              src={nowChat?.post?.imageUrl}
              width="48px"
              height="48px"
            />
          )}

          <Flex fd="column" ai="flex-start">
            <Flex>
              <Text body2 bold margin="0 4px 0 23px">
                {isDone ? "판매완료" : "판매중"}
              </Text>
              <Text body2>{nowChat?.post?.postTitle}</Text>
            </Flex>
            <Flex>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  marginLeft: "23px",
                }}
              >
                {priceComma(nowChat?.post?.price)}
              </p>
            </Flex>
          </Flex>
        </Flex>
        <Flex>{/* <Button onClick={leaveRoom}>나가기</Button> */}</Flex>
      </Wrap>

      <Container>
        {messages?.length > 0 &&
          messages.map((msg, i) => {
            if (msg.from === from)
              return (
                <Flex
                  key={`${i}_msg_${msg}`}
                  // width="100%"
                  height="auto"
                  fd="column"
                  ai="flex-end"
                >
                  <Flex fd="column" ai="start">
                    <Flex
                      width="fit-content"
                      height="fit-content"
                      padding="8px"
                      margin="15px 20px 5px 5px"
                      bc={theme.pallete.primary700}
                      br="8px"
                    >
                      <Text>{msg.message}</Text>
                    </Flex>
                    <Flex>
                      <p
                        style={{
                          fontSize: "10px",
                          color: `${theme.pallete.gray3}`,
                        }}
                      >
                        {moment(msg.time).format("hh:mm")}
                      </p>
                    </Flex>
                  </Flex>
                </Flex>
              );
            else
              return (
                <Wrap padding="19px 19px 0 19px" key={`${i}_msg_${msg}`}>
                  <Flex width="fit-content">
                    <Image
                      circle
                      size={56}
                      margin="0 8px 0 0"
                      src={nowChat.targetUser.profileImage}
                    />
                    <Flex fd="column" ai="start">
                      <p style={{ fontSize: "12px", margin: "4px 0" }}>
                        {nowChat.targetUser.nickname}
                      </p>
                      <Flex
                        width="fit-content"
                        height="fit-content"
                        padding="8px"
                        br="8px"
                        jc="start"
                        bc="white"
                      >
                        <Text>{msg.message}</Text>
                      </Flex>

                      <Flex>
                        <p
                          style={{
                            fontSize: "10px",
                            color: `${theme.pallete.gray3}`,
                            margin: "5px 5px 5px 0",
                          }}
                        >
                          {moment(msg.time).format("hh:mm")}
                        </p>
                      </Flex>
                    </Flex>
                  </Flex>
                </Wrap>
              );
          })}

        <div ref={messagesEndRef} />
      </Container>
      <FixedChatBar>
        <Flex>
          <ChatFileInput />
          {uploadFile ? (
            <Image width="60px" height="50px" src={uploadFile} />
          ) : (
            <Input
              withBtn
              icon={
                <Icon padding="0" onClick={sendMessage}>
                  <ArrowUpward />
                </Icon>
              }
              fg="1"
              square
              br="8px"
              placeholder="메세지를 작성해주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
          )}
        </Flex>
      </FixedChatBar>
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - 188px);
  background-color: #e0e0e0;
  overflow-y: scroll;
  margin: 0 0 72px;
`;

const ImageDark = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
`;

const FixedChatBar = styled.div`
  align-items: center;

  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: ${({ theme }) => `${theme.view.maxWidth}`};
  padding: 10px 12px;
  border-top: 1px solid gray;
  z-index: 20;
  background-color: white;
`;

export default ChatRoom;
