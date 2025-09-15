import { io, Socket } from "socket.io-client";

const API_URL = process.env.VITE_API_URL || "http://localhost:5000/api/v1";

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

export const createChat = async (participants: string[]) => {
  const res = await fetch(`${API_URL}/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participants }),
  });
  return res.json();
};

export const getChats = async (chatId: string) => {
  const res = await fetch(`${API_URL}/chats`);
  return res.json();
};

export const getMessages = async (chatId: string) => {
  const res = await fetch(`${API_URL}/chats/${chatId}/messages`);
  return res.json();
};

export const sendMessageSocket = (
  chatId: string,
  sender: string,
  text: string,
  cb?: (res: unknown) => void
) => {
  initSocket().emit("sendMessage", { chatId, sender, text }, cb);
};

export const joinChat = (chatId: string) => {
  initSocket().emit("joinChat", { chatId });
};

export const onNewMessage = (handler: (msg: unknown) => void) => {
  initSocket().on("newMessage", handler);
};
