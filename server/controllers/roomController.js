const Room = require('../models/Room');
const User = require('../models/User');

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate('postedBy', 'fullName profilePic');
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch a single room by its SLUG
// @route   GET /api/rooms/:slug
// @access  Public
const getRoomBySlug = async (req, res) => {
    try {
        const room = await Room.findOne({ slug: req.params.slug }).populate('postedBy', '-password');

        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room by slug:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new room listing
// @route   POST /api/rooms
// @access  Private
const createRoom = async (req, res) => {
  try {
    const { title, area, city, price, imageUrls, features, roomType, description } = req.body;

    const room = new Room({
      title,
      area,
      city,
      price,
      imageUrls,
      features,
      roomType,
      description,
      postedBy: req.user._id, // Get the user's ID from the 'protect' middleware
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getRooms, getRoomBySlug, createRoom };
