const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    // An array containing the ObjectIds of the two users in the conversation
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
