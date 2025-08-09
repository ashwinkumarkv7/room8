const express = require('express');
const { getRooms, getRoomBySlug, createRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware'); // 1. Import the protect middleware
const router = express.Router();

// 2. This route now handles both GET (public) and POST (private) requests.
// The 'protect' middleware ensures only logged-in users can create a room.
router.route('/').get(getRooms).post(protect, createRoom);

// 3. This route gets a single room by its slug (public).
router.route('/:slug').get(getRoomBySlug);

module.exports = router;
