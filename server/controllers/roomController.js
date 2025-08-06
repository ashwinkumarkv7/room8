const Room = require('../models/Room');

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getRooms };
