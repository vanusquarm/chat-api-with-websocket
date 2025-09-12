const { Server } = require('socket.io');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

module.exports = function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    // Join a chat room to receive messages for that chat
    socket.on('joinChat', async ({ chatId }) => {
      if (!chatId) return;
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

    // Leave a chat room
    socket.on('leaveChat', ({ chatId }) => {
      if (!chatId) return;
      socket.leave(chatId);
    });

    // Create a chat (mirrors POST /api/chat/create)
    socket.on('createChat', async (payload, ack) => {
      try {
        const { participants } = payload;
        const chat = new Chat({ participants });
        await chat.save();

        // Emit to creator and broadcast if needed
        socket.emit('chatCreated', chat);
        if (ack) ack({ success: true, chat });
      } catch (err) {
        console.error(err);
        if (ack) ack({ success: false, error: err.message });
      }
    });

    // Send message (mirrors POST /api/chat/send)
    socket.on('sendMessage', async (payload, ack) => {
      try {
        const { chatId, text, sent } = payload;
        if (!chatId || !sender || !text) {
          const errMsg = 'chatId, sender, and text are required';
          if (ack) ack({ success: false, error: errMsg });
          return;
        }

        const message = new Message({
          chat_id: chatId,
          content: text.trim(),
          sent,
        });

        await message.save();

        // Emit to all clients in the chat room
        io.to(chatId).emit('newMessage', message);

        if (ack) ack({ success: true, message });
      } catch (err) {
        console.error(err);
        if (ack) ack({ success: false, error: err.message });
      }
    });

    // Request message history for a chat (mirrors GET /api/chat/:chatId/messages)
    socket.on('getMessages', async ({ chatId }, ack) => {
      try {
        if (!chatId) {
          if (ack) ack({ success: false, error: 'chatId is required' });
          return;
        }
        const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
        if (ack) ack({ success: true, messages });
      } catch (err) {
        console.error(err);
        if (ack) ack({ success: false, error: err.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};
