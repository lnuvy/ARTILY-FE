import { createSlice } from "@reduxjs/toolkit";

/*
 * @한울 5/2
 */

const initialState = {
  // 신규 알람
  notiCnt: 0,
  // 채팅방 리스트
  roomList: [{ roomName: null, messages: [] }],
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
  },
});

const { reducer, actions } = chatSlice;
export const { newNotification, notificationCheck } = actions;
export default reducer;
