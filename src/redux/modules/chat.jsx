import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";
import { socket } from "../../shared/socket";
/*
 * @ 한울
 */

// 5/19 얘기한 chatdata 데이터 모양
// const 데이터모양 = {
//   userId,
//   nickname,
//   profileImage,
//   connected,
//   chatRoom: [
//     {
//       roomName: "",
//       lastTime: "",
//       lastMessage: "",
//       post: {},
//       newMessage: 3,
//       targetUser: {},
//     },
//     {},
//     {},
//     {},
//   ],
// };

// 채팅방리스트 모양
// const roomList = [
//   {
//     post: {
//       postId: "postIdforchat",
//       imageUrl:
//         "https://cdn.clien.net/web/api/file/F01/12355532/2e10d6d02e7df0.jpg?w=780&h=30000",
//       postTitle: "채팅용",
//       price: 2000,
//       done: false,
//     },
//     targetUser: {
//       userId: "asdfasdf",
//       nickname: "asdfasdf",
//       profileImage: "asdfasdfasdfa",
//     },
//     roomName: "from2222434554_to2222423044_postIdforchat",
//     messages: [],
//     lastMessage: "dfdf",
//     lastTime: "",
//     newMessage: 0,
//   },
// ];

const initialState = {
  chatData: [],
  roomMessages: {},
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

export const getChatMessages = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getMessages()
      .then((res) => {
        console.log(res);
        // dispatch(getMessages(res.data));
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
    makeChatRoom: (state, action) => {
      // TODO 다시볼것
      state.chatData.chatRoom.unshift(action.payload);
    },
    getMessages: (state, action) => {
      state.roomMessages = action.payload;
    },

    // 누군가 채팅걸었을때 바로 채팅방 목록 생기게하기
    receiveChatRoom: (state, action) => {
      const { roomName } = action.payload;
      if (state.roomList.find((room) => roomName === room.roomName)) {
        return;
      }

      const newChatRoom = {
        ...action.payload,
      };
      state.roomList.unshift(newChatRoom);
    },
    receiveChat: (state, action) => {
      const { from, message, roomName, time } = action.payload;
      const myId = socket?.id;

      state.roomList.forEach((room) => {
        if (room.roomName === roomName) {
          room.messages.push(action.payload);
          room.lastTime = time;

          if (from !== myId) {
            room.newMessage++;
          }
        }
      });
    },
  },
});

const { reducer, actions } = chatSlice;
export const {
  chatInfo,
  makeChatRoom,
  getMessages,
  newNotification,

  // createChatRoom,
  receiveChatRoom,
  receiveChat,
} = actions;
export default reducer;
