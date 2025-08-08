const express = require('express');
const { getRooms, getRoomById } = require('../controllers/roomController');
const router = express.Router();

// This route gets all rooms
router.route('/').get(getRooms);

// This new route gets a single room by its ID
router.route('/:id').get(getRoomById);

module.exports = router;
