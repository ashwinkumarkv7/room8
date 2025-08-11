const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Start a new conversation
// @route   POST /api/conversations
// @access  Private
const startConversation = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const senderId = req.user._id; // From protect middleware

    // Check if a conversation between these two users already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
      });
    }

    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all of a user's conversations
// @route   GET /api/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ participants: req.user._id })
            .populate('participants', 'fullName profilePic'); // Populate with user details
        res.json(conversations);
    } catch (error) {
        console.error('Error getting conversations:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all messages for a specific conversation
// @route   GET /api/conversations/:id/messages
// @access  Private
const getMessagesForConversation = async (req, res) => {
    try {
        // Find all messages that belong to this conversation and sort them by creation time
        const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 'asc' });
        res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { startConversation, getConversations, getMessagesForConversation };
