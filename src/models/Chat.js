const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    participants: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: 'A chat must have at least two participants'
      },
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Chat', chatSchema);
