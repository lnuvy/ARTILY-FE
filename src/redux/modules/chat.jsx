import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { Apis } from "../../shared/api";
import { socket } from "../../shared/socket";
/*
 * @ 한울
 */

// 채팅방리스트 모양
const roomList = [
  {
    post: {
      postId: "postIdforchat",
      imageUrl:
        "https://cdn.clien.net/web/api/file/F01/12355532/2e10d6d02e7df0.jpg?w=780&h=30000",
      postTitle: "채팅용",
      price: 2000,
      done: false,
    },

    postUser: "2222423044",
    roomName: "from2222434554_to2222423044_postIdforchat",
    profileImage: "",
    messages: [],
    lastMessage: "dfdf",
    lastTime: "df",
    newMessage: 0,
  },
];

const initialState = {
  // 채팅방 리스트
  roomList: [],
};

export const getChatList = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getChatList()
      .then((res) => {
        console.log(res);
        console.log(res.data.chatRoomName);
        console.log(res.data.chatRoomName);
        dispatch(getChatRoom(res.data.chatRoomName));
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
    getChatRoom: (state, action) => {
      state.roomList = action.payload;
    },
    notificationCheck: (state, action) => {
      const roomName = action.payload;

      state.roomList.forEach((room) => {
        if (room.roomName === roomName) {
          room.newMessage = 0;
          return;
        }
      });
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
          // 딕셔너리 넣었는데 터져서 배열로 바꿈
          room.lastMessage = message;
          room.lastTime = time;
          // 남이보낸거면 카운트 추가
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
  getChatRoom,
  newNotification,
  notificationCheck,
  // createChatRoom,
  receiveChatRoom,
  receiveChat,
} = actions;
export default reducer;
