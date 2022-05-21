import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";
import { socket } from "../../shared/socket";

/*
 * @ 한울
 */

const initialState = {
  chatData: [],
  roomMessages: [],
  nowChat: {},
};

export const getChatList = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getChatData()
      .then((res) => {
        console.log("TODO res 데이터 잘보기", res);
        if (res.status === 204) {
          console.log("아직 채팅방없음");
        }
        dispatch(chatInfo(res.data.newChat));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
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
      const myId = socket?.id;
    },

    chatUserConnected: (state, action) => {
      const { connected, userId } = action.payload;
      // console.log(connected, userId);
    },
    makeChatRoom: (state, action) => {
      // TODO 다시볼것
      state.chatData.chatRoom.push(action.payload);
      state.nowChat = action.payload;
      console.log("채팅하기 누른사람만 떠야함");
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

    // 누군가 채팅걸었을때 바로 채팅방 목록 생기게하기
    receiveChatRoom: (state, action) => {
      const { roomName } = action.payload;
      console.log("receiveChatRoom 이름", roomName);
      if (state.chatData.chatRoom.find((room) => roomName === room.roomName)) {
        console.log("receiveChatRoom find 결과값있을때");
      }

      const newChatRoom = {
        ...action.payload,
      };
      console.log(newChatRoom);
      state.chatData.chatRoom.unshift(newChatRoom);
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

  // createChatRoom,
  receiveChatRoom,
} = actions;
export default reducer;
