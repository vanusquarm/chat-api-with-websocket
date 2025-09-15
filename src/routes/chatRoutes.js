const express = require('express');
const {
  sendMessage,
  getMessages,
  createChat,
  getChats
} = require('../controllers/chatController');
const {
  validateCreateChat,
  validateSendMessage,
  validateChatIdParam
} = require('../middleware/validation');

const router = express.Router();

// Get all chats
router.get('/', getChats);

// Create a new chat
router.post('/', validateCreateChat, createChat);

// Send a message to a chat
router.post('/:chatId/messages', validateSendMessage, sendMessage);

// Get messages for a chat
router.get('/:chatId/messages', validateChatIdParam, getMessages);

module.exports = router;
