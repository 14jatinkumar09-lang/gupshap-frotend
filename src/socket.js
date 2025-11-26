import { io } from "socket.io-client";

let socket = null;

export const createSocket = (userId) => {
  if (socket) return socket; // prevent duplicate connections

  socket = io(import.meta.env.VITE_DB_ORIGIN_URL, {
    transports: ["websocket"], // force WebSocket instead of polling
  upgrade: true,  
    query: { _id: userId },
  });

  return socket;
};

export const getSocket = () => socket ;