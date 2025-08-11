const express = require('express');
const { startConversation, getConversations, getMessagesForConversation } = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// This route handles starting (POST) and getting a list of conversations (GET)
router.route('/').post(protect, startConversation).get(protect, getConversations);

// This new route gets all messages for a specific conversation ID
router.route('/:id/messages').get(protect, getMessagesForConversation);

module.exports = router;
