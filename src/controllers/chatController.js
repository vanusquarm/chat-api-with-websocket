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
  const { chatId, text, sent } = req.body;
  const message = new Message({
    chat_id: chatId,
    content: text.trim(),
    sent,
  });

  try {
    // Check chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }finally {
    // Update recent messages in Chat
    await updateRecentMessages(chatId, message);
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

async function updateRecentMessages(chatId, newMessage) {
  // 1. Fetch the chat document's recentMessages array
  const chat = await Chat.findById(chatId).select("recentMessages").exec();
  if (!chat) throw new Error("Chat not found");

  // 2. Add new message at the front
  let recentMessages = chat.recentMessages || [];
  recentMessages.unshift(newMessage); // add at front

  // 3. Trim array to MAX_RECENT
  if (recentMessages.length > MAX_RECENT) {
    recentMessages = recentMessages.slice(0, MAX_RECENT);
  }

  // 4. Update the chat document with new recentMessages and save
  chat.recentMessages = recentMessages;
  await chat.save();

  return chat;
}

module.exports = {
  createChat,
  sendMessage,
  getMessages
};
