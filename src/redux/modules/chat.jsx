import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
/*
 * @ 한울
 */

// 채팅방리스트 모양
// const roomList = [
//   {
//     nickname: "진우",
//     post: {
//       postId: "postIdforchat",
//       imageUrl:
//         "https://cdn.clien.net/web/api/file/F01/12355532/2e10d6d02e7df0.jpg?w=780&h=30000",
//       postTitle: "채팅용",
//       price: 2000,
//     },
//     postUser: "2222423044",
//     roomName: "from2222434554_to2222423044_postIdforchat",
//     lastMessage: {
//       message: "dfdf",
//       time: "2022-05-05 12:00:00",
//       myself: true / false,
//     },
//   },
// ];

const initialState = {
  // 채팅방 리스트
  roomList: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 누군가 채팅걸었을때 바로 채팅방 목록 생기게하기
    receiveChatRoom: (state, action) => {
      const newChatRoom = {
        ...action.payload,
      };
      state.roomList.unshift(newChatRoom);
    },
    createChatRoom: (state, action) => {
      const { roomName, post } = action.payload;

      const newChatRoom = {
        roomName,
        messages: [],
        newMessage: 0,
        profileImage: "",
        post,
      };

      console.log(newChatRoom);

      state.roomList.unshift(newChatRoom);
    },
    messagesUpdate: (state, action) => {
      const { roomName, messages } = action.payload;

      state.roomList.forEach((room) => {
        if (room.roomName === roomName) {
          room.messages = messages;
        }
      });
    },
  },
});

const { reducer, actions } = chatSlice;
export const {
  newNotification,
  notificationCheck,
  createChatRoom,
  receiveChatRoom,
  messagesUpdate,
} = actions;
export default reducer;
