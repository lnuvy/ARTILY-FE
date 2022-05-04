import io from "socket.io-client";

const URL = "http://52.78.183.202";
export const socket = io(URL, { transports: ["websocket"] });
