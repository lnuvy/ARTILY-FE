import { io } from "socket.io-client";

const URL = "http://localhost:5000";
// const URL = "http://52.78.183.202";
export const socket = io(URL, { autoConnect: false });

// 모든 이벤트 확인
socket.onAny((event, ...args) => {
  console.log(event, args);
});
