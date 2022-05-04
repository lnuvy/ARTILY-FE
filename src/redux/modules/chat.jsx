import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
/*
 * @ 한울
 */

const initialState = {
  // 신규 알람
  notiCnt: 0,
  // 채팅방 리스트
  roomList: [],
  // 새로 온 메세지
  newMessage: {
    from: null,
    message: null,
    time: null,
    roomName: null,
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newNotification: (state) => {
      state.alarmCount = 1;
    },
    notificationCheck: (state, action) => {},

    // 누군가 채팅걸었을때 바로 채팅방 목록 생기게하기
    receiveChatRoom: (state, action) => {
      const newChatRoom = {
        lastChat: [
          {
            message: state.newMessage.message,
            curTime: state.newMessage.time,
          },
        ],
        unchecked: 1,
        targetPk: state.newMessage.userPk,
        ...action.payload,
      };

      state.list.unshift(newChatRoom);
    },
    createChatRoom: (state, action) => {
      const from = action.payload.split("_")[0].slice(4);
      const to = action.payload.split("_")[1].slice(2);

      const newChatRoom = {
        roomName: action.payload,
        messages: [],
        nickname: from,
        other: to,
      };
      console.log(newChatRoom);

      state.roomList.unshift(newChatRoom);
    },
  },
});

const { reducer, actions } = chatSlice;
export const {
  newNotification,
  notificationCheck,
  createChatRoom,
  receiveChatRoom,
} = actions;
export default reducer;
