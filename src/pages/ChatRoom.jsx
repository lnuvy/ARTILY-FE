import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Image,
  Input,
  Text,
  Wrap,
  Icon,
  Button,
  Grid,
} from "../elements";
import { socket } from "../shared/socket";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { ChatFileInput } from "../components";
import { ArrowUpward } from "../assets/icons";
import { priceComma } from "../shared/utils";
import { ArrowBack } from "../assets/icons";
import { useHistory } from "react-router-dom";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  // url 에서 가져온 현재 방 이름
  const roomName = pathname.slice(6);
  const from = useSelector((state) => state?.user?.user?.userId);
  const targetUserId = useSelector(
    (state) => state?.chat?.nowChat?.targetUser?.userId
  );
  const isMe = useSelector((state) => state.user.user.userId);
  console.log("내 정보", isMe);
  // console.log(targetUserId);

  const { chatData, nowChat, roomMessages, getChatMessages, clearChat } =
    useSelector((state) => state.chat);
  // import recei
  const target =
    nowChat?.targetUser?.userId === from
      ? nowChat.createUser
      : nowChat.targetUser;
  // console.log("target!!!!!!", target);
  // const nowConnected = target.connected;
  const isDone = nowChat?.post?.done;

  console.log("targetUser", nowChat.targetUser);
  console.log("createUser", nowChat.createUser);
  // 사진업로드
  const uploadFile = useSelector((state) => state.image.represent);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const [infinity, setInfinity] = useState([]);

  useEffect(() => {
    setMessages(roomMessages);
  }, []);

  // useEffect(() => {
  //   dispatch(getChatMessages);
  // }, []);
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
        to: target?.userId,
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
    if (roomName === nowChat.roonName) {
      setMessages(getChatMessages);
    }
    socket.on("receive_message", (data) => {
      setMessages((messages) => [...messages, data]); //과거 채팅기록 받아오기
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

  //채팅방 나가기
  const leaveRoom = () => {
    socket.emit("leave_room", roomName, targetUserId);
  };

  useEffect(() => {
    socket.on("_room", (data) => {
      // console.log(data);
    });
  });

  return (
    <>
      <Wraptop>
        <Icon margin="20px 15px" onClick={() => history.goBack()}>
          <ArrowBack />
        </Icon>
        {/* 내 userId와 이 채팅방을 만든사람의 아이디가 같다면 targetUser 정보 보여주기 */}
        {isMe === nowChat?.createUser?.userId ? (
          <div className="targetInfo">
            <Flex>
              <Image
                circle
                size="25"
                src={nowChat?.targetUser?.profileImage}
              ></Image>
              <Text body1 margin="0 0 0 5px">
                {nowChat?.targetUser?.nickname}
              </Text>
            </Flex>
          </div>
        ) : (
          // 아이디가 다르다면 내가 만든 방이 아니니까 이 방을 만든사람 정보 보여주기
          // 결론적으로 내가 아닌 상대 정보가 상단에 떠야함
          <div className="targetInfo">
            <Flex>
              <Image
                circle
                size="25"
                src={nowChat?.createUser?.profileImage}
              ></Image>
              <Text body1 margin="0 0 0 5px">
                {nowChat?.createUser?.nickname}
              </Text>
            </Flex>
          </div>
        )}

        <button
          onClick={() => {
            // window.confirm("채팅방을 나가시겠습니까?");
            if (window.confirm("채팅방을 나가시겠습니까?")) {
              history.goBack();
            } else {
              return;
            }
            leaveRoom();
          }}
        >
          나가기
        </button>
      </Wraptop>
      <Wrapinfo>
        <Flex>
          {isDone ? (
            <ImageDark>
              <Image
                br="8px"
                src={nowChat.post.imageUrl}
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
                  fontWeight: "600",
                  marginLeft: "23px",
                }}
              >
                {priceComma(nowChat?.post?.price)}원
              </p>
            </Flex>
          </Flex>
        </Flex>
      </Wrapinfo>

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
                  <Flex fd="column" ai="start" margin="16px 16px 0 0">
                    <Flex
                      width="fit-content"
                      height="fit-content"
                      padding="8px"
                      margin="15px 20px 5px 5px"
                      bc={theme.pallete.primary700}
                      br="8px"
                      minWidth="48px"
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
                <Wrap margin="16px 16px 0 16px" key={`${i}_msg_${msg}`}>
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
          {/* <ChatFileInput /> */}
          <Input
            withBtn
            icon={
              <Icon padding="1px" onClick={sendMessage}>
                <ArrowUpward color="white" />
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
        </Flex>
      </FixedChatBar>
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - 146px);
  background-color: #f3f3f3;

  overflow-y: scroll;
  margin-top: 142px;
  padding-bottom: 80px;
`;

const ImageDark = styled.div`
  /* background-color: rgba(0, 0, 0, 0.4); */
`;

const FixedChatBar = styled.div`
  align-items: center;

  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: ${({ theme }) => `${theme.view.maxWidth}`};
  padding: 10px 12px;
  z-index: 20;
  background-color: white;
`;
const Wraptop = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 20px;
    right: 23px;
    line-height: 24px;
    font-size: 15px;
    /* font-weight: bold; */
    color: ${({ theme }) => theme.pallete.primary850};
    background-color: #fff;
  }
  .targetInfo {
    position: absolute;
    top: 20px;
    left: 50px;
  }
  width: 100vw;
  max-width: ${theme.view.maxWidth};
  height: fit-content;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
  position: fixed;
  background-color: #fff;
  z-index: 99;
`;
const Wrapinfo = styled.div`
  /* border-top: 1px solid #eee; */
  padding: 15px 16px;
  background-color: #d3d3d3;
  margin: 64px 0 0 0;
  position: fixed;
  width: 100vw;
`;
const Wraptarget = styled.div``;
export default ChatRoom;
