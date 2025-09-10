const express = require('express');
const {
  sendMessage,
  getMessages,
  createChat
} = require('../controllers/chatController');
const {
  validateCreateChat,
  validateSendMessage,
  validateChatIdParam
} = require('../middleware/validation');

const router = express.Router();

router.post('/create', validateCreateChat, createChat);
router.post('/send', validateSendMessage, sendMessage);
router.get('/:chatId/messages', validateChatIdParam, getMessages);

module.exports = router;
