import { io, Socket } from "socket.io-client";

const API_URL = process.env.VITE_API_URL || "http://localhost:3000";

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

export const createChat = async (participants: string[]) => {
  const res = await fetch(`${API_URL}/api/chat/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participants }),
  });
  return res.json();
};

export const getMessages = async (chatId: string) => {
  const res = await fetch(`${API_URL}/api/chat/${chatId}/messages`);
  return res.json();
};

export const sendMessageSocket = (
  chatId: string,
  sender: string,
  text: string,
  cb?: (res: any) => void
) => {
  initSocket().emit("sendMessage", { chatId, sender, text }, cb);
};

export const joinChat = (chatId: string) => {
  initSocket().emit("joinChat", { chatId });
};

export const onNewMessage = (handler: (msg: any) => void) => {
  initSocket().on("newMessage", handler);
};
