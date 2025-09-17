const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    sent: { type: Boolean, required: true }, // true = user sent, false = received
  },
  {
    timestamps: true, // set to false if you want to handle timestamps manually
  }
);

messageSchema.index({ chat_id: 1, timestamp: -1 });
module.exports = mongoose.model('Message', messageSchema);
