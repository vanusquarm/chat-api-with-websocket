const { body, param, validationResult } = require('express-validator');

const validateCreateChat = [
  body('participants')
    .isArray({ min: 2 })
    .withMessage('Participants must be an array with at least two phone numbers')
    .custom((arr) => arr.every((p) => typeof p === 'string' && /^\+?[0-9]{7,15}$/.test(p)))
    .withMessage('Each participant must be a valid phone number string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(', ') });
    }
    next();
  }
];

const validateSendMessage = [
  body('chatId')
    .isMongoId()
    .withMessage('chatId must be a valid MongoDB ObjectId'),
  body('sender')
    .isString()
    .withMessage('sender is required')
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage('sender must be a valid phone number string'),
  body('text')
    .isString()
    .withMessage('text is required')
    .trim()
    .notEmpty()
    .withMessage('text cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(', ') });
    }
    next();
  }
];

const validateChatIdParam = [
  param('chatId')
    .isMongoId()
    .withMessage('chatId must be a valid MongoDB ObjectId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(', ') });
    }
    next();
  }
];

module.exports = {
  validateCreateChat,
  validateSendMessage,
  validateChatIdParam
};
