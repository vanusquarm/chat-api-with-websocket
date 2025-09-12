const Chat = require('../models/Chat');
const Message = require('../models/Message');

const createChat = async (req, res, next) => {
  try {
    const { participants } = req.body;

    const chat = new Chat({ participants });
    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { chatId, text, sent } = req.body;

    // Check chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const message = new Message({
      chat_id: chatId,
      content: text.trim(),
      sent,
    });

    await message.save();

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    // Check chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createChat,
  sendMessage,
  getMessages
};
