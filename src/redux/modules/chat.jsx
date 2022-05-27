import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";
import { socket } from "../../shared/socket";

/*
 * @ 한울
 */

const initialState = {
  // 로그인직후 처음부터 불러오는 정보 (chatData)
  chatData: [],

  // 채팅방 목록에서 하나를 특정했을때 채워지는 메세지들
  roomMessages: [],

  // 채팅방 목록에서 하나를 특정했을때 들어가는 방의 정보(chatData.chatRoom 한개)
  nowChat: {},
};

export const getChatList = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getChatData()
      .then((res) => {
        // console.log("TODO res 데이터 잘보기", res);
        if (res.status === 204) {
          // console.log("아직 채팅방없음");
        }
        dispatch(chatInfo(res.data.newChat));
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.response);
      });
  };
};

export const getChatMessages = (roomName) => {
  return async function (dispatch, getState, { history }) {
    Apis.getMessages(roomName)
      .then((res) => {
        console.log(res);
        if (roomName === res.data.roomUser.roomName) {
          dispatch(getMessages(res.data.roomUser.messages));
          history.push(`/chat/${roomName}`);
        } else {
          alert("룸네임이 서로 일치하지않음!!!! (에러)");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatInfo: (state, action) => {
      state.chatData = action.payload;
    },

    chatUserConnected: (state, action) => {
      const { connected, userId } = action.payload;
      // console.log(connected, userId);
    },
    makeChatRoom: (state, action) => {
      // TODO 다시볼것
      state.chatData.chatRoom.push(action.payload);
      state.nowChat = action.payload;
      // console.log("채팅하기 누른사람만 떠야함");
    },

    getNowChatInfo: (state, action) => {
      let nowChat = state.chatData.chatRoom.find(
        (room) => room.roomName === action.payload
      );
      state.nowChat = nowChat;
    },
    getMessages: (state, action) => {
      state.roomMessages = action.payload;
    },
    resetMessages: (state, action) => {
      state.roomMessages = [];
    },
    //다른 게시글 채팅걸었을때 채팅기록 안남아있도록
    clearChat: (state, action) => {
      state.nowChat = [];
    },
    // 목록창에서 누군가 채팅걸었을때 바로 채팅방 목록 생기게하기
    receiveChatRoom: (state, action) => {
      const { roomName } = action.payload;
      // console.log("receiveChatRoom 이름", roomName);

      state.chatData.chatRoom.unshift(action.payload);
    },

    // 목록 보고있을때 lastMessage 와 lastTime 갱신하기
    //가장 최근 메시지 띄우기
    receiveChat: (state, action) => {
      const { roomName, message, time, from } = action.payload;

      const myId = socket.id;

      state.chatData.chatRoom.forEach((room) => {
        if (room.roomName === roomName) {
          room.lastMessage = message;
          room.lastTime = time;
          if (from !== myId) {
            room.newMessage++;
          }
          return;
        }
      });
    },
  },
});

const { reducer, actions } = chatSlice;
export const {
  chatInfo,
  chatUserConnected,
  makeChatRoom,
  getMessages,
  getNowChatInfo,
  resetMessages,
  newNotification,
  clearChat,
  receiveChatRoom,
  receiveChat,
} = actions;
export default reducer;
