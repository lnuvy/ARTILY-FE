import io from "socket.io-client";

// const URL = "http://52.78.183.202";
const URL = "http://localhost:5000";
export const socket = io(URL, { transports: ["websocket"] });

export const created = () => {
  const sessionID = localStorage.getItem("sessionID");
  if (sessionID) {
    this.usernameAlreadySelected = true;
    socket.auth = { sessionID };
    socket.connect();
  }
};

// 소켓 작업하지않으시는분들은 여기 싹다 주석처리하시고 작업하시면 소켓연결 에러 안뜹니다~
