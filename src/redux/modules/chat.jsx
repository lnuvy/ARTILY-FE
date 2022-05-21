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

      // state.chatData.chatRoom.forEach((room) => {
      //   if (room.targetUser.userId === userId) {
      //     let newDic = {
      //       ...room.targetUser,
      //       connected,
      //     };
      //     room.targetUser = newDic;
      //     return;
      //   }
      //   if (room.createUser.userId === userId) {
      //     let newDic = {
      //       ...room.createUser,
      //       connected,
      //     };
      //     room.createUser = newDic;
      //     return;
      //   }
      // });
    },
    makeChatRoom: (state, action) => {
      // TODO 다시볼것
      state.chatData.chatRoom.unshift(action.payload);
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
      if (state.chatData.chatRoom.find((room) => roomName === room.roomName)) {
        return;
      }

      const newChatRoom = {
        ...action.payload,
      };
      state.roomList.unshift(newChatRoom);
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
