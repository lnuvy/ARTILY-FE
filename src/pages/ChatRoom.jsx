import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Flex, Image, Input, Text, Wrap, Icon } from "../elements";
import { socket } from "../shared/socket";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { ChatFileInput } from "../components";
import { ArrowUpward } from "../assets/icons";
import { priceComma } from "../shared/utils";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  const from = useSelector((state) => state.user.user?.userId);

  const { chatData, nowChat, roomMessages } = useSelector(
    (state) => state.chat
  );

  const target =
    nowChat?.targetUser?.userId === from
      ? nowChat.createUser
      : nowChat.targetUser;
  console.log("target!!!!!!", target);
  // const nowConnected = target.connected;
  const isDone = nowChat?.post?.done;

  // 사진업로드
  const uploadFile = useSelector((state) => state.image.represent);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const [infinity, setInfinity] = useState([]);

  useEffect(() => {
    setMessages(roomMessages);
  }, []);

  // 상단 채팅끌어오기위해 데이터 20개단위로 자르기
  // const setInfinityPaging = (page, endpoint) => {
  //   let arr = [];
  //   for (let i = page; i >= 0; i--) {
  //     let sliceArr = nowChat.messages.slice(i * 20 - endpoint);
  //     console.log(sliceArr);
  //     arr.push(sliceArr);
  //   }
  //   return arr;
  // };

  // useEffect(() => {
  //   if (!nowChat) {
  //     history.replace("/chat");
  //   }
  // });

  const sendMessage = () => {
    if (/\S/.test(message) && !uploadFile) {
      const messageData = {
        roomName,
        from,
        message,
        to: target.userId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      socket.emit("send_message", messageData);
      setMessages((messages) => [...messages, messageData]);
      setMessage("");
    } else {
      alert("공백만 입력됨");
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.emit("check_chat", roomName);
    };
  }, []);

  // 스크롤 부드럽게 내리기
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const leaveRoom = () => {
  //   socket.emit("leave_room", roomName);
  // };

  useEffect(() => {
    socket.on("leave_room", (data) => {
      console.log(data);
    });
  });

  return (
    <>
      <Wrap padding="10px 16px">
        <Flex>
          {isDone ? (
            <ImageDark>
              <Image
                br="8px"
                src={chatData?.post?.imageUrl}
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
                        {moment(msg.time).format("a hh:mm")}
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
                      src={target.profileImage}
                    />
                    <Flex fd="column" ai="start">
                      <p style={{ fontSize: "12px", margin: "4px 0" }}>
                        {target.nickname}
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
                          {moment(msg.time).format("a hh:mm")}
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
