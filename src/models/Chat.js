const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    _id: { type: String, required: true }, // UUID
    name: { type: String, required: true, trim: true },
    participants: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: 'A chat must have at least two participants'
      },
      index: true
    },
    last_message: { type: String, trim: true },
    last_message_time: { type: Date },
    unread_count: { type: Number, default: 0 },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

chatSchema.index({ last_message_time: -1 });
module.exports = mongoose.model('Chat', chatSchema);
