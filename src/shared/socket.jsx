import { io } from "socket.io-client";
// import { SocketIOFileUpload } from "socketio-file-upload";

// const URL = "http://localhost:5000";
const URL = "https://rusy7225.shop";
export const socket = io(URL, { autoConnect: false });
// export const siofu = SocketIOFileUpload(socket);
// export const stream = ss.createStream();

// 모든 이벤트 확인
socket.onAny((event, ...args) => {
  // console.log(event, args);
});

// socket.on("user connected", (data) => {
//   console.log(data);
// });

// export const socketConnection = (user) => {
//   if (user) {
//     if (user?.profileImage && user?.nickname) {
//       socket.auth = { user };
//       console.log("사진과 닉네임 둘다있을때만 커넥트");
//       socket.connect();
//     }
//   }
// };

// export const userConnection = () => {
//   socket.on("user connected", (data) => {
//     console.log(data);
//   });
// };
